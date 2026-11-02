import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    whatsapp: {
      type: String,
      required: true,
      trim: true,
    },
    attendance: {
      type: String,
      required: true,
      enum: ['attending', 'unable'],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

rsvpSchema.index(
  { whatsapp: 1 },
  {
    unique: true,
    partialFilterExpression: { whatsapp: { $type: 'string' } },
  },
);

export default mongoose.models.RSVP || mongoose.model('RSVP', rsvpSchema);
