import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const emailAlreadyExists = await User.findOne({ email });
        if (emailAlreadyExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hour
        const user = new User({ name, email, password: hashedPassword, verificationToken, verificationTokenExpiresAt });
        await user.save();

        generateTokenAndSetCookie(res, user._id);
        res.status(201).json({
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: null,
            },

        });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}


export const login = async (req, res) => {
    res.send("login api");
}

export const logout = async (req, res) => {
    res.send("logout api");
}