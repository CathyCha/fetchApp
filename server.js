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
const { Walker } = require('./models/walker')

// to validate object IDs
const { ObjectID } = require('mongodb')

// hash for passwords
const bcrypt = require('bcryptjs')

// handle file (image) uploads
const http = require("http");
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const upload = multer({
    dest: "/public/images/uploaded"
});

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

//enable CORS to bypass security (baaaad, baaaad)
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
app.use(allowCrossDomain);

/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

/*** Webpage routes below **********************************/

// static directories
app.use(express.static(__dirname + '/public'))

// route for root
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

/*********************************************************/

/*** API Routes below ************************************/

/** User resource routes **/
// a POST route to *create* a user
app.post('/user', (req, res) => {
    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            // password is hashed with the salt
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                /*
                //to compare to another password
                bcrypt.compare("password", hash, (error, res) => {
                    console.log(error, res);
                });*/

                const user = new User({
                    username: req.body.username,
                    passwordHash: hash,
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
        });
    }
    else {
        res.status(400).send("No data sent");   
    }
});

/// Route for getting information for one user.
// GET /user/id
app.get('/user/:id', (req, res) => {
	// Add code here
	const id = req.params.id;
	
	console.log(id);
	
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}
	
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send(); //could not find user
		} else {
			res.send(user);
		}
	}).catch((error) => {
		res.status(500).send(); //server error
	});
})

/** Dog resource routes **/

/// Route for adding dog to a user
// POST /dogs/userid
app.post('/dogs/:userid', (req, res) => {
	// Add code here
	const id = req.params.userid;
	
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}
	const dog = {
        dogName: req.body.dogName,
        needs: [], //fill this in dynamically first time dog requests a walk
        weight: req.body.weight,
        ratings: []
	};
	
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send(); //could not find user
		} else {
			user.userDogs.push(dog);
			return user.save();
		}
	}).then((result) => {
		res.send(result);
	}).catch((error) => {
		res.status(500).send(); //server error
	});
})

/// Route for getting all of a user's dogs
// GET /dogs/userid
app.get('/dogs/:userid', (req, res) => {
	// Add code here
	const id = req.params.userid;
	
	console.log(id);
	
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}
	
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send(); //could not find user
		} else {
			res.send( user.userDogs );
		}
	}).catch((error) => {
		res.status(500).send(); //server error
	});
})

/** Walker resource routes **/
// a POST route to *create* a walker
app.post('/walker', (req, res) => {
    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            // password is hashed with the salt
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                /*
                //to compare to another password
                bcrypt.compare("password", hash, (error, res) => {
                    console.log(error, res);
                });*/

                const walker = new Walker({
                    username: req.body.username,
                    passwordHash: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    homeAddress: req.body.homeAddress,
                    city: req.body.city,
                    province: req.body.province,
                    phoneNumber: req.body.phoneNumber,
                    emailAddress: req.body.emailAddress,
                    dateJoined: new Date(),
                    languages: req.body.languages,
                    qualifications: req.body.qualifications,
                    ratings: []
                });
            
                walker.save().then((result) => {
                    res.send(result);
                }, (error) => {
                    res.status(400).send(error);
                })
            });
        });
    }
});

/// Route for getting information for one walker.
// GET /walker/id
app.get('/walker/:id', (req, res) => {
	// Add code here
	const id = req.params.id;
	
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}
	
	User.findById(id).then((walker) => {
		if (!walker) {
			res.status(404).send(); //could not find user
		} else {
			res.send(walker);
		}
	}).catch((error) => {
		res.status(500).send(); //server error
	});
})

/** Other routes **/

/// Route for uploading an image for a user profile picture
/// Image will be stored as /public/images/uploaded/id.{jpg.png} 
// POST /upload/{userid/dogid/walkerid}
app.post('/upload/:id', upload.single("file" /* name of file element in form */), 
(req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
		res.status(404).send("Cannot find entity with that id");
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./public/images/uploaded/", id + ext);

    fs.rename(tempPath, targetPath, err => {
        if (err) res.status(500).send(err);

        res.status(200).end("File uploaded!");
    });
})

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});