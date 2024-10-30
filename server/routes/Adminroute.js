import express from 'express'; 
import { login, makehr } from '../controllers/Admincontroller.js';
const router = express.Router();

router.put('/selecthr/:employeeId',makehr);
router.post('/login', login);

export { router as Adminroute};