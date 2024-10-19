import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import {  avlleave, login, maxleave, userdetails } from '../controllers/HRcontroller.js';

router.post('/login',login)
router.get('/userprofile/:userId',userdetails)
router.get('/maxleaves/:userId',maxleave)
router.get('/avalleaves/:userId',avlleave)

export{router as HRrouter};