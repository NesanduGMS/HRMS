import express from 'express';

const app = express();
import cors from 'cors';

import { HRrouter } from './routes/HRroute.js';


app.get('/', (req, res) => {
    res.send('Hello Nesa');
});


app.use(cors(
    { origin:['http://localhost:3000'],
      methods:['GET','POST','PUT','DELETE'],
      credentials:true
    }
 ))
app.use(express.json());


app.use('/auth', HRrouter);


app.listen(3005, () => {
    console.log('Server is running on port 3005');
});