import type { VercelRequest, VercelResponse } from '@vercel/node';
import { recordVisitor } from '../../server/db.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { sessionId } = req.body ?? {};
  if (typeof sessionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(sessionId)) {
    return res.status(400).json({ message: 'Invalid visitor session ID' });
  }

  const result = await recordVisitor(sessionId, req.headers['user-agent']);
  return res.status(result.success ? 200 : 503).json({
    message: result.success ? 'Visitor tracked' : 'Could not track visitor',
    visitorCount: result.visitorCount,
    uniqueVisitors: result.uniqueVisitors,
  });
}
