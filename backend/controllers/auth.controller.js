import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/User.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerivificationEmail, sendWelcomeEmail, sendPasswordResetEmail } from '../mailtrap/emails.js';

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
        await sendVerivificationEmail(user.email, verificationToken);
        res.status(201).json({
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined,
            },

        });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}


export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {

        if (!code) {
            return res.status(400).json({ message: "Please provide verification code" });
        }

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = Date.now();
        await user.save();

        res.status(200).json({
            message: "Login successful",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 3600 * 1000; // 1 hour
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        // send email
        await sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        return res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    try {
        const { password, passwordConfirm } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }
        if (password !== passwordConfirm) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        user.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user)  return res.status(401).json({ message: "Unauthorized" });
        
        res.status(200).json({
            message: "User authenticated",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
        
    }
}


export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
}