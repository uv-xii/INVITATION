import dotenv from 'dotenv';
import { MongoClient, type Db } from 'mongodb';

dotenv.config();

const dbName = process.env.MONGODB_DB_NAME || 'wedding_invitation';

let client: MongoClient | null = null;
let dbPromise: Promise<Db> | null = null;

async function getDb(): Promise<Db> {
  const uri = (process.env.MONGODB_URI || '').trim();

  if (!uri) {
    throw new Error('MONGODB_URI is missing in the deployment environment.');
  }

  if (!/^mongodb(\+srv)?:\/\//i.test(uri)) {
    throw new Error('MONGODB_URI has an invalid MongoDB connection-string format.');
  }

  if (!dbPromise) {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    dbPromise = client.connect()
      .then(() => {
        console.log(`[MongoDB] Connected to database: ${dbName}`);
        return client!.db(dbName);
      })
      .catch(async (error: unknown) => {
        dbPromise = null;
        try {
          await client?.close();
        } catch {
          // Ignore cleanup errors.
        }
        client = null;

        console.error(
          '[MongoDB] Connection failed:',
          error instanceof Error ? error.message : 'Unknown error'
        );

        throw new Error('MongoDB connection failed. Check Atlas credentials and Network Access.');
      });
  }

  return dbPromise;
}

export async function saveRSVPToMongo(data: {
  guestName: string;
  whatsappNumber: string;
  attendanceStatus: 'Fully attending' | 'Regretfully unable to attend';
}) {
  const guestName = data.guestName.trim();
  const whatsappNumber = data.whatsappNumber.replace(/[^\d+]/g, '');

  if (!guestName || !whatsappNumber || !data.attendanceStatus) {
    return { success: false, message: 'All fields are required.' };
  }

  try {
    const database = await getDb();
    const rsvps = database.collection('rsvps');
    const now = new Date();

    const existing = await rsvps.findOne({ whatsappNumber });

    if (existing) {
      await rsvps.updateOne(
        { _id: existing._id },
        {
          $set: {
            guestName,
            attendanceStatus: data.attendanceStatus,
            updatedTimestamp: now,
          },
        }
      );

      return {
        success: true,
        message: 'Your RSVP has been updated successfully. Thank you!',
        isUpdate: true,
      };
    }

    await rsvps.insertOne({
      guestName,
      whatsappNumber,
      attendanceStatus: data.attendanceStatus,
      submissionTimestamp: now,
    });

    return {
      success: true,
      message: 'Your RSVP has been confirmed. Thank you!',
      isUpdate: false,
    };
  } catch (error) {
    console.error(
      '[MongoDB] RSVP save failed:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return {
      success: false,
      message: 'We could not save your RSVP. Please try again later.',
    };
  }
}

export async function recordVisitor(sessionId: string, userAgent?: string) {
  if (!sessionId) {
    return { success: false, error: 'sessionId required' };
  }

  const database = await getDb();
  const visitors = database.collection('visitors');
  const now = new Date();

  const result = await visitors.updateOne(
    { sessionId },
    {
      $set: { lastVisit: now, userAgent },
      $setOnInsert: { firstVisit: now },
      $inc: { visitCount: 1 },
    },
    { upsert: true }
  );

  const totalVisitors = await visitors.countDocuments();

  const visitor = await visitors.findOne(
    { sessionId },
    { projection: { visitCount: 1 } }
  );

  return {
    success: true,
    totalVisitors,
    uniqueVisitors: totalVisitors,
    visitorCount: visitor?.visitCount ?? 1,
    isNew: result.upsertedCount > 0,
  };
}

export async function getVisitorStats() {
  const database = await getDb();
  const visitors = database.collection('visitors');

  const totalVisitors = await visitors.countDocuments();
  const visits = await visitors.aggregate<{ total: number }>([
    { $group: { _id: null, total: { $sum: '$visitCount' } } },
  ]).toArray();

  return {
    success: true,
    totalVisitors,
    uniqueVisitors: totalVisitors,
    totalVisits: visits[0]?.total ?? 0,
    isConnected: true,
  };
}