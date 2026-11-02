import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB_NAME || 'wedding_invitation';

let client: MongoClient | null = null;
let db: Db | null = null;
let isConnected = false;

// In-memory fallback if MongoDB Atlas is not yet connected
const inMemoryVisitors = new Map<string, { sessionId: string; firstVisit: Date; lastVisit: Date; visitCount: number; userAgent?: string }>();
const inMemoryRSVPs = new Map<string, { guestName: string; whatsappNumber: string; attendanceStatus: string; submissionTimestamp: Date }>();

async function getDb(): Promise<Db | null> {
  if (db && isConnected) return db;
  if (!uri || uri.includes('<username>') || uri.includes('placeholder')) {
    return null;
  }

  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
      });
    }
    await client.connect();
    db = client.db(dbName);
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to database: ${dbName}`);
    return db;
  } catch (err) {
    console.warn('[MongoDB] Connection notice: Falling back to in-memory visitor/RSVP store:', (err as Error).message);
    isConnected = false;
    return null;
  }
}

export interface VisitorRecord {
  sessionId: string;
  firstVisit: Date;
  lastVisit: Date;
  visitCount: number;
  userAgent?: string;
}

export interface RSVPRecord {
  guestName: string;
  whatsappNumber: string;
  attendanceStatus: 'Fully attending' | 'Regretfully unable to attend';
  submissionTimestamp: Date;
  updatedTimestamp?: Date;
}

export async function recordVisitor(sessionId: string, userAgent?: string) {
  if (!sessionId) return { success: false, error: 'sessionId required' };

  const database = await getDb();

  if (database) {
    try {
      const visitorsCol: Collection<VisitorRecord> = database.collection('visitors');
      const now = new Date();

      const existing = await visitorsCol.findOne({ sessionId });
      let visitorCount: number;
      if (existing) {
        await visitorsCol.updateOne(
          { sessionId },
          {
            $set: { lastVisit: now, userAgent },
            $inc: { visitCount: 1 },
          }
        );
        visitorCount = existing.visitCount + 1;
      } else {
        await visitorsCol.insertOne({
          sessionId,
          firstVisit: now,
          lastVisit: now,
          visitCount: 1,
          userAgent,
        });
        visitorCount = 1;
      }

      const totalVisitors = await visitorsCol.countDocuments();
      return { success: true, totalVisitors, uniqueVisitors: totalVisitors, visitorCount, isNew: !existing };
    } catch (err) {
      console.warn('[MongoDB] Visitor record error:', err);
    }
  }

  // Fallback to in-memory store
  const now = new Date();
  const existing = inMemoryVisitors.get(sessionId);
  if (existing) {
    existing.lastVisit = now;
    existing.visitCount += 1;
    existing.userAgent = userAgent;
  } else {
    inMemoryVisitors.set(sessionId, {
      sessionId,
      firstVisit: now,
      lastVisit: now,
      visitCount: 1,
      userAgent,
    });
  }

  return {
    success: true,
    totalVisitors: inMemoryVisitors.size,
    uniqueVisitors: inMemoryVisitors.size,
    visitorCount: inMemoryVisitors.get(sessionId)?.visitCount ?? 1,
    isNew: !existing,
  };
}

export async function getVisitorStats() {
  const database = await getDb();

  if (database) {
    try {
      const visitorsCol = database.collection('visitors');
      const totalVisitors = await visitorsCol.countDocuments();
      const visits = await visitorsCol.aggregate<{ total: number }>([
        { $group: { _id: null, total: { $sum: '$visitCount' } } },
      ]).toArray();
      return {
        success: true,
        totalVisitors,
        uniqueVisitors: totalVisitors,
        totalVisits: visits[0]?.total ?? 0,
        isConnected: true,
      };
    } catch (err) {
      console.warn('[MongoDB] Stats error:', err);
    }
  }

  const totalVisitors = inMemoryVisitors.size;
  const totalVisits = [...inMemoryVisitors.values()].reduce(
    (total, visitor) => total + visitor.visitCount,
    0,
  );
  return { success: true, totalVisitors, uniqueVisitors: totalVisitors, totalVisits, isConnected: false };
}

export async function saveRSVPToMongo(data: {
  guestName: string;
  whatsappNumber: string;
  attendanceStatus: 'Fully attending' | 'Regretfully unable to attend';
}) {
  const { guestName, whatsappNumber, attendanceStatus } = data;

  if (!guestName || !whatsappNumber || !attendanceStatus) {
    return { success: false, error: 'All fields are required.' };
  }

  // Normalize phone number (digits only for clean duplicate check)
  const normalizedPhone = whatsappNumber.replace(/[^\d+]/g, '');

  const database = await getDb();

  if (database) {
    try {
      const rsvpCol = database.collection('rsvps');
      const now = new Date();

      // Check duplicate by phone number
      const existing = await rsvpCol.findOne({
        $or: [{ whatsappNumber: normalizedPhone }, { whatsappNumber }],
      });

      if (existing) {
        await rsvpCol.updateOne(
          { _id: existing._id },
          {
            $set: {
              guestName: guestName.trim(),
              attendanceStatus,
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

      await rsvpCol.insertOne({
        guestName: guestName.trim(),
        whatsappNumber: normalizedPhone,
        attendanceStatus,
        submissionTimestamp: now,
      });

      return {
        success: true,
        message: 'Your RSVP has been confirmed. Thank you!',
        isUpdate: false,
      };
    } catch (err) {
      console.warn('[MongoDB] Save RSVP error:', err);
    }
  }

  // Fallback in-memory
  const now = new Date();
  const existing = inMemoryRSVPs.get(normalizedPhone);
  if (existing) {
    existing.guestName = guestName.trim();
    existing.attendanceStatus = attendanceStatus;
    existing.submissionTimestamp = now;
    return {
      success: true,
      message: 'Your RSVP has been updated successfully. Thank you!',
      isUpdate: true,
    };
  }

  inMemoryRSVPs.set(normalizedPhone, {
    guestName: guestName.trim(),
    whatsappNumber: normalizedPhone,
    attendanceStatus,
    submissionTimestamp: now,
  });

  return {
    success: true,
    message: 'Your RSVP has been confirmed. Thank you!',
    isUpdate: false,
  };
}
