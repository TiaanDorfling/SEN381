import UserModel from './UserModel.js';
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    moderationLog: [{ 
        action: String, 
        timestamp: { type: Date, default: Date.now } 
    }]
});

AdminSchema.methods.moderateForum = function() {}
AdminSchema.methods.manageUsers = function() {}
AdminSchema.methods.overseeContent = function() {}

const AdminModel = UserModel.discriminator('admin', AdminSchema);


export default AdminModel;