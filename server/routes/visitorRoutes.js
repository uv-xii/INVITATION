import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

router.post('/track', async (req, res) => {
  try {
    const { sessionId } = req.body ?? {};

    if (typeof sessionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(sessionId)) {
      return res.status(400).json({ message: 'Invalid visitor session ID' });
    }

    const now = new Date();
    const visitor = await Visitor.findOneAndUpdate(
      { sessionId },
      {
        $set: { lastVisit: now },
        $setOnInsert: { firstVisit: now },
        $inc: { visitCount: 1 },
      },
      {
        upsert: true,
        returnDocument: 'after',
        runValidators: true,
        setDefaultsOnInsert: false,
      },
    );
    const uniqueVisitors = await Visitor.countDocuments();

    return res.json({
      message: 'Visitor tracked',
      visitorCount: visitor.visitCount,
      uniqueVisitors,
    });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return res.status(500).json({ message: 'Could not track visitor' });
  }
});

router.get('/stats', async (_req, res) => {
  try {
    const uniqueVisitors = await Visitor.countDocuments();
    const totalVisits = await Visitor.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$visitCount' },
        },
      },
    ]);

    return res.json({
      uniqueVisitors,
      totalVisits: totalVisits[0]?.total || 0,
    });
  } catch (error) {
    console.error('Visitor stats error:', error);
    return res.status(500).json({ message: 'Could not retrieve visitor statistics' });
  }
});

export default router;
