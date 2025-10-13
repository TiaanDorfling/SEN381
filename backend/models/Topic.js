// backend/models/Topic.js
import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moduleCode: { type: String, required: true, trim: true },
    status: { type: String, enum: ['OPEN', 'ASSIGNED', 'RESOLVED'], default: 'OPEN' },
    tags: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

topicSchema.index({ title: 'text', body: 'text', tags: 1 });

export default mongoose.model('Topic', topicSchema);
