import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import { login } from '../controllers/HRcontroller.js';

router.post('/login',login)

export{router as HRrouter};