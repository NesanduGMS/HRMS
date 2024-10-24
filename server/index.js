import express from 'express';
import cors from 'cors';
import { HRrouter } from './routes/HRroute.js';
import employeeRoutes from './routes/employeeRoutes.js'; // Import employeeRoutes with default export

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Nesa');
});

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());



// Use the HR router
app.use('/auth', HRrouter);
// Use employee routes
app.use('/api/employees', employeeRoutes); // Use employee routes




app.listen(3005, () => {
    console.log('Server is running on port 3005');
});
