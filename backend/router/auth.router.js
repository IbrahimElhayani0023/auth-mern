import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// routes
router.get("/login", login);
router.get("/register", register);
router.get("/logout", logout);

export default router;