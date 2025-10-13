import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    // MongoDB automatically generates the _id, so we removed userID
    name: { 
        type: String, 
        required: [true, 'Name is required.'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required.'], 
        unique: true, 
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid email address.']
    },
    passwordHash: { // This stores the hashed password from bcrypt
        type: String, 
        required: [true, 'Password is required.'] 
    },
    role: { 
        type: String, 
        enum: ['admin', 'tutor', 'student'], 
        required: true 
    }
}, { 
    // DiscriminatorKey tells Mongoose which field determines the subtype
    discriminatorKey: 'role', 
    // All users will be stored in one 'users' collection
    collection: 'users',
    // Options to include virtuals/getters when converting to JSON/Objects
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
});

// Create the base model. Discriminators extend this model.
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;