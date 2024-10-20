import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import {  avlleave, login, maxleave, userdetails, viewinfoa, viewinfob, viewinfoc } from '../controllers/HRcontroller.js';

router.post('/login',login)
router.get('/userprofile/:userId',userdetails)
router.get('/maxleaves/:userId',maxleave)
router.get('/avalleaves/:userId',avlleave)
router.get('/viewinfoa/:ID',viewinfoa)
router.get('/viewinfob/:ID',viewinfob)
router.get('/viewinfoc/:ID',viewinfoc)

export{router as HRrouter};