
import express from 'express';
const router = express.Router();
import { login, userdetails, maxleave, avlleave, viewinfoa, viewinfob, viewinfoc, flogout, selsup, addleavereq, fetchleaves, approveleave, getPerformance, workinfo, coninfo } from '../controllers/HRcontroller.js';

router.post('/login', login);
router.get('/userprofile/:userId', userdetails);
router.get('/maxleaves/:userId', maxleave);
router.get('/avalleaves/:userId', avlleave);
router.get('/viewinfoa/:ID', viewinfoa);
router.get('/viewinfob/:ID', viewinfob);
router.get('/viewinfoc/:ID', viewinfoc);
router.get('/logout', flogout);
router.get('/selsupervisor/:EmployeeId', selsup);
router.post('/addleavereq/:EmployeeId', addleavereq);
router.get('/leaves/:supID',fetchleaves);
router.put('/approveleave/:id',approveleave);
router.get('/performance/:UID',getPerformance);
router.get('/workinfo/:UID',workinfo);
router.get('/coninfo',coninfo);

export { router as HRrouter };
