import express from 'express'; 
import { login, makehr, viweadd } from '../controllers/Admincontroller.js';
const router = express.Router();

router.put('/selecthr/:employeeId',makehr);
router.post('/login', login);
router.get('/viewview', viweadd);

export { router as Adminroute};