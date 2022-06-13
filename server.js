// Dependencies
const express = require('express');

// Intialize the Express App
const app = express();

// Configure App Settings
require('dotenv').config();

const {PORT = 4000, MONGODB_URL} = proces.env

// Mount Middleware
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Mount Routes
app.listen(PORT, () => {
    console.log(`Express is listneing on port ${PORT}`)
})

// Tell Express to  Listen