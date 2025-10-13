// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9._%+-]+@student\.belgiumcampus\.ac\.za$/i, 'Campus student email required']
    },
    role: { type: String, enum: ['STUDENT', 'TUTOR', 'ADMIN'], default: 'STUDENT' },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
