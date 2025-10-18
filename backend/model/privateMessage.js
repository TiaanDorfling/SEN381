// backend/model/privateMessage.js
import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

// A conversation can have multiple participants (Student, Tutor, Admin)
const conversationSchema = new Schema(
  {
    participants: [
      {
        user: { type: Types.ObjectId, ref: "User", required: true },
        role: { type: String, enum: ["student", "tutor", "admin"], required: true },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Individual message within a conversation
const privateMessageSchema = new Schema(
  {
    conversation: { type: Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    senderRole: { type: String, enum: ["student", "tutor", "admin"], required: true },
    text: { type: String, required: true },
    readBy: [
      {
        user: { type: Types.ObjectId, ref: "User" },
        readAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

// Indexes for performance
privateMessageSchema.index({ conversation: 1, createdAt: 1 });

export const Conversation = model("Conversation", conversationSchema);
export const PrivateMessage = model("PrivateMessage", privateMessageSchema);
