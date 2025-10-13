import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    // Strong validation: campus student email
    match: [
      /^[a-z0-9._%+-]+@student\.belgiumcampus\.ac\.za$/i,
      'Campus student email required',
    ],
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required.'],
  },
  role: {
    type: String,
    enum: ['admin', 'tutor', 'student'],
    required: true,
  },
}, {
  discriminatorKey: 'role',   // supports role-specific models
  collection: 'users',        // all users in one collection
  timestamps: true,           
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
});
UserSchema.index({ email: 1 }, { unique: true });
// Base model for discriminators (AdminModel, TutorModel, etc.)
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
