import { UserFactory } from '../controller/UserFactory.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';

export class Auth{
    static async register(req,res){
        const {role, email, password, name} = req.body;
        
        try{
            //hash password code, make modular later.
            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = UserFactory.createUser(role,{name, email, passwordHash: hashedPassword});
            
            const savedUser = await newUser.save();

            //generate JWT
            const token = jwt.sign(
            { id: savedUser._id, userType: role },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
            );
                return res.status(201).json({
                message: `${role} registered successfully!`,
                token,
                user: {
                    id: savedUser._id,
                    email: savedUser.email,
                    name: savedUser.name
                }
            });
        }
        catch (error){
            if (error.code === 11000) { // MongoDB duplicate key error code
            return res.status(409).json({ message: 'Email already in use.' });
            }
            console.error(error);
            return res.status(500).json({ message: 'Server error during registration.' });
        }
    }
}