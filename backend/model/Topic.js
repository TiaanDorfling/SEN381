import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moduleCode: { type: String, required: true, trim: true },
    status: { type: String, enum: ['OPEN', 'ASSIGNED', 'RESOLVED'], default: 'OPEN' },
    tags: [{ type: String, trim: true }],
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

  },
  { timestamps: true }
);

topicSchema.index({ title: 'text', body: 'text' });
topicSchema.index({ tags: 1 }); 

topicSchema.methods.addSubscriber = function(userId) {
    const isSubscribed = this.subscribers.some(
      (subscriberId) => subscriberId.equals(userId)
    );

    if (!isSubscribed) {
      this.subscribers.push(userId);
    }
    return this.save();
};
topicSchema.methods.removeSubscriber = function(userId) {
  // Filter out the user ID
  this.subscribers = this.subscribers.filter(
    (subscriberId) => !subscriberId.equals(userId)
  );
  return this.save(); // Save the updated document
};
topicSchema.methods.broadcastTopic = function() {};
topicSchema.methods.notifyTutors = function() {};

export default mongoose.model('Topic', topicSchema);