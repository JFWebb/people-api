///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// import express
const express = require('express');
// create applicatio object
const app = express();
//import mongoose
const mongoose = require("mongoose");
//import middleware
const cors = require("cors");
const morgan = require("morgan");



// Configure App Settings
require('dotenv').config();

const {PORT = 4000, MONGODB_URL} = process.env

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Connect to mongoDB
mongoose.connect(MONGODB_URL);

// Mongo Status Listeners
mongoose.connection
    .on("connected", () => console.log("Connected to MongoDB"))
    .on("error", (error) => console.log('Error with MongoDB: ' + error.message));

///////////////////////////////
// MODELS --> normally in own folder, smooshing it all into server for simplicity
///////////////////////////////
const peopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
}, {timestamps: true})

const People = mongoose.model('People', peopleSchema);

///////////////////////////////
// MOUNT MIDDLEWARE
///////////////////////////////
// takes care of setting up a cors policy and will send that policy as a special response header that the browser can handle and invoke as neccissary
// this sets up a default cors policy called Access-Control-Allow.
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()) 
// 👆 this creates req.body
// app.use(express.urlencoded({extended: false})) 
// 👆 this also creates req.body but only when ecpress is serving HTML

///////////////////////////////
// MOUNT ROUTES
///////////////////////////////
app.get('/', (req, res) => {
    res.send('Hello World');
});

//Index
app.get('/people', async (req, res) => {
    // error handling with try catch
    try {
        const people = await People.find({});
        res.send(people); 
    // catches the error without crashing the whole program
    } catch (error) {
        console.log('error: ', error)
        res.send({error: 'something went wrong - checl console'});
    }
    
});

//Create
app.post('/people', async (req, res) => {
    try {
        // res.send vs res.json. Both send json data. res.json is less flexible. res.send is more versatile, and will parse any parseable code into json, it can also send plain text. 
        // but if you want to be very explicit res.json . carries less overhead. 
        res.json(await People.create(req.body));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'})
    }
});
//Update

// Delete


///////////////////////////////
// Tell Express to  Listen
///////////////////////////////
app.listen(PORT, () => {
    console.log(`Express is listneing on port ${PORT}`)
});


