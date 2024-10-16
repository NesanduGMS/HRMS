const express = require('express');
const { default: db } = require('./utils/db');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello Nesa');
});

app.listen(3005, () => {
    console.log('Server is running on port 3005');
});