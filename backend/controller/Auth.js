import { UserFactory } from '../controller/UserFactory.js';

export class Auth{
    static async register(req,res){
        const {role, email, password, name} = req.body;
        
        try{
            //hash password code, make modular later.
            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = UserFactory.createUser(role,{name, email, passwordHash: hashedPassword});
            //save user to database
            //
            //generate JWT
            const token = jwt.sign(
            { id: newUser.userID, userType: role },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
            );
                return res.status(201).json({
                message: `${type} registered successfully!`,
                token,
                user: {
                    id: newUser.userID,
                    email: newUser.email,
                    name: newUser.name
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