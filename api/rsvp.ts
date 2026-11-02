import type { VercelRequest, VercelResponse } from '@vercel/node';
import { saveRSVPToMongo } from '../server/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name, whatsapp, attendance } = req.body || {};

    const normalizedPhone = typeof whatsapp === 'string'
      ? whatsapp.replace(/[\s()-]/g, '')
      : '';

    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
      return res.status(400).json({ success: false, message: 'Please enter a valid name.' });
    }

    if (!/^\+?[1-9]\d{7,14}$/.test(normalizedPhone)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid WhatsApp number.' });
    }

    if (attendance !== 'attending' && attendance !== 'unable') {
      return res.status(400).json({ success: false, message: 'Please select your attendance status.' });
    }

    const result = await saveRSVPToMongo({
      guestName: name.trim(),
      whatsappNumber: normalizedPhone,
      attendanceStatus: attendance === 'attending'
        ? 'Fully attending'
        : 'Regretfully unable to attend',
    });
    return res.status(result.success ? 200 : 500).json(result);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
