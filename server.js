/* Server side code */

'use strict';

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')


// import the mongoose models
const { User } = require('./models/user')
const { Dog } = require('./models/dogs')
//const { Walker } = require('./models/walker')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())


/*** Webpage routes below **********************************/

// static js directory
app.use("/js", express.static(__dirname + '/public/js'))

// static css directory
app.use("/css", express.static(__dirname + '/public/css'))

/*
// static html directory
app.use("/", express.static(__dirname + '/public/'))
*/

// route for root
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

/*********************************************************/

/*** API Routes below ************************************/

/** User resource routes **/
// a POST route to *create* a user
app.post('/user', (req, res) => {

    const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        homeAddress: req.body.homeAddress,
        city: req.body.city,
        province: req.body.province,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        dateJoined: new Date(),
        userDogs: []
    });

    user.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    })
});



const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});