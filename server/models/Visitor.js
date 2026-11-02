import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstVisit: {
      type: Date,
      default: Date.now,
    },
    lastVisit: {
      type: Date,
      default: Date.now,
    },
    visitCount: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Visitor', visitorSchema);
