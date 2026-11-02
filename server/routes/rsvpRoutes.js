import express from 'express';
import RSVP from '../models/RSVP.js';

const router = express.Router();

function isDuplicateKeyError(error) {
  return error && typeof error === 'object' && 'code' in error && error.code === 11000;
}

router.post('/', async (req, res) => {
  try {
    const { name, whatsapp, attendance } = req.body ?? {};

    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
      return res.status(400).json({ success: false, message: 'Please enter a valid name.' });
    }

    const normalizedPhone = typeof whatsapp === 'string'
      ? whatsapp.replace(/[\s()-]/g, '')
      : '';

    if (!/^\+?[1-9]\d{7,14}$/.test(normalizedPhone)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid WhatsApp number.' });
    }

    if (attendance !== 'attending' && attendance !== 'unable') {
      return res.status(400).json({ success: false, message: 'Please select your attendance status.' });
    }

    const now = new Date();
    const nameValue = name.trim();
    let existing = await RSVP.findOne({ whatsapp: normalizedPhone });

    if (!existing) {
      const legacyExisting = await RSVP.collection.findOne({ whatsappNumber: normalizedPhone });
      if (legacyExisting) {
        await RSVP.collection.updateOne(
          { _id: legacyExisting._id },
          {
            $set: {
              name: nameValue,
              whatsapp: normalizedPhone,
              attendance,
              submittedAt: now,
              updatedAt: now,
            },
          },
        );
        return res.json({
          success: true,
          message: 'Your RSVP has been updated successfully. Thank you!',
          isUpdate: true,
        });
      }
    }

    if (existing) {
      existing.name = nameValue;
      existing.attendance = attendance;
      existing.submittedAt = now;
      await existing.save();
      return res.json({
        success: true,
        message: 'Your RSVP has been updated successfully. Thank you!',
        isUpdate: true,
      });
    }

    await RSVP.create({
      name: nameValue,
      whatsapp: normalizedPhone,
      attendance,
      submittedAt: now,
    });

    return res.status(201).json({
      success: true,
      message: 'Your RSVP has been submitted successfully!',
      isUpdate: false,
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return res.status(409).json({
        success: false,
        message: 'This WhatsApp number has already submitted an RSVP.',
      });
    }

    console.error('RSVP submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to submit RSVP. Please try again.',
    });
  }
});

export default router;
