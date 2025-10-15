import UserModel from '../model/UserModel.js';
import bcrypt from 'bcryptjs';

// Update profile (self-service)
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // From auth middleware
    const { name, email, password } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: `User not found` });

    // Optional updates
    if (name) user.name = name.trim();
    if (email) user.email = email.toLowerCase().trim();
    if (password) user.passwordHash = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    // Get user ID from middleware (req.user is set in auth.js)
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized – no user found in request' });
    }

    // Find user and exclude password hash
    const user = await UserModel.findById(userId).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Current user retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Server error retrieving user profile' });
  }
};