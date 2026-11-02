import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getVisitorStats } from '../../server/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const stats = await getVisitorStats();
  if (!stats.isConnected) {
    return res.status(503).json({ message: 'Could not retrieve visitor statistics' });
  }

  return res.json({
    uniqueVisitors: stats.uniqueVisitors,
    totalVisits: stats.totalVisits,
  });
}
