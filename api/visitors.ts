import type { VercelRequest, VercelResponse } from '@vercel/node';
import { recordVisitor, getVisitorStats } from '../server/db.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { sessionId } = req.body || {};
    const userAgent = req.headers['user-agent'];
    const result = await recordVisitor(sessionId, userAgent);
    return res.status(200).json(result);
  }

  if (req.method === 'GET') {
    const stats = await getVisitorStats();
    return res.status(200).json(stats);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
