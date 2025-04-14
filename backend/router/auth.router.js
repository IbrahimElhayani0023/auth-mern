import express from 'express';
import { register, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


router.get("/check-auth", verifyToken,checkAuth);
// auth routes
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/reset-password/:token", resetPassword);

//verification prosses
router.post("/forgot-password", forgotPassword);
router.post("/verify-email", verifyEmail);


export default router;