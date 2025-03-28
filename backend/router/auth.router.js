import express from 'express';
import { register, login, logout, verifyEmail, forgotPassword } from '../controllers/auth.controller.js';

const router = express.Router();

// auth routes
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);

//verification prosses
router.post("/verify-email", verifyEmail);


export default router;