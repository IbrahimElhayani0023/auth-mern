// imports
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import router from './router/auth.router.js';
import { connectDB } from './config/connectDB.js';
dotenv.config();
// variables

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', router);


// listen
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port 8000');
});