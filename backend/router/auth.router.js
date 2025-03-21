import express from 'express';
import { register, login, logout, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router();

// auth routes
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);


//verification prosses
router.post("/verify-email", verifyEmail);


export default router;