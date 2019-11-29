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
const { Walk } = require('./models/walk')
const { Report } = require('./models/report')

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

//enable CORS to bypass security (bad, baaaad)
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

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {

    if (req.session.user) {
        if (req.session.userType === "user") {
            res.redirect('/userProfile.html');
        }
        else if (req.session.userType === "walker") {
            res.redirect('/walkerProfile.html');
        }
        else if (req.session.userType === "admin") {
            res.redirect('/adminpage.html');
        }
    } else {
        next(); // next() moves on to the route.
    }    
};

/*** Webpage routes below **********************************/

// route for root
app.get('/', sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

// static directories
app.use(express.static(__dirname + '/public'))

/*********************************************************/

/*** API Routes below ************************************/

/** Login routes **/
/* example bodies
{
	"username": "doglover21",
	"password": "password",
	"userType": "user"
} 
{
	"username": "john123",
	"password": "password123",
	"userType": "walker"
}
{
	"username": "admin",
	"password": "admin",
	"userType": "walker" //this field doesn't matter - it's not checked
}
*/
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userType = req.body.userType;

    if (!username || !password || !userType) {
        res.status(400).send("Username or password or userType field missing/incorrect");
        return;
    }
    if (username === "admin") {
        //hardcoded credentials, hurrah!
        if (password === "admin") {
            req.session.user = "admin";
            req.session.userType = "admin";
            res.redirect('/adminpage.html')
        }
        else {
            res.status(401).send(); //invalid password
        }
    }
    else if (userType === "user") {
        User.findOne({username: username}).then((user) => {
            if (!user) {
                res.status(401).send(); //invalid user
            }
            else {
                //compare password
                bcrypt.compare(password, user.passwordHash, (error, result) => {
                    if (error) {
                        res.status(400).send(error); //bcrypt error
                    }
                    else if (result) {
                        req.session.user = user._id;
                        req.session.userType = "user";
                        res.redirect('/userProfile.html');
                    }
                    else {
                        res.status(401).send(); //invalid password
                    }
                })
            }
        }).catch((error) => {
            res.status(400).send('server error');
        });
    }
    else if (userType === "walker") {
        Walker.findOne({username: username}).then((walker) => {
            if (!walker) {
                res.status(401).send(); //invalid user
            }
            else {
                //compare password
                bcrypt.compare(password, walker.passwordHash, (error, result) => {
                    if (error) {
                        res.status(400).send(); //bcrypt error
                    }
                    else if (result) {
                        req.session.user = walker._id;
                        req.session.userType = "walker";
                        res.redirect('/walkerProfile.html');
                    }
                    else {
                        res.status(401).send(); //invalid password
                    }
                })
            }
        }).catch((error) => {
            res.status(400).send('server error');
        });
    }
    else {
        res.status(400).send('no userType set');
    }
});

// A route to logout a user
app.get('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
});

/** User resource routes **/
// a POST route to *create* a user
/* example body
{
	"username": "doglover21",
	"password" : "password",
	"firstName": "Jane",
	"lastName": "Doe",
	"homeAddress": "123 Baker St",
	"emailAddress": "me@jane.com"
}
*/
app.post('/user', (req, res) => {
    if (req.body.username && req.body.password) {
        //check if username already taken
        User.findOne({username: req.body.username}).then((user) => {
            if (req.body.username === "admin") {
                res.status(403).send("Cannot use username 'admin'");
            }
            else if (user) {
                res.status(403).send("Username taken");
            }
            else {
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
        });
    }
    else {
        res.status(400).send("Bad request");   
    }
});

/// Route for getting information for one user.
// GET /user/id
app.get('/user/:id', (req, res) => {
	// Add code here
	const id = req.params.id;
	
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
/* example body
{
	"dogName" : "Rufus",
	"weight" : 10
}
*/
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
/* example body
{
	"username": "john123",
	"password" : "password123",
	"firstName": "John",
	"lastName": "Smith",
	"homeAddress": "125 Baker St",
	"emailAddress": "john@smith.com"
}
*/
app.post('/walker', (req, res) => {

    if (req.body.username && req.body.password) {
        //check if username already taken
        Walker.findOne({username: req.body.username}).then((walker) => {
            if (req.body.username === "admin") {
                res.status(403).send("Cannot use username 'admin'");
            }
            else if (walker) {
                res.status(403).send("Username taken");
            }
            else {
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
                            languages: [],
                            qualifications: [],
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
    }
    else {
        res.status(400).send("Bad request");   
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

/** Walk resource routes **/

/// Route for adding a walk for a user's dog and a walker
// POST /dogs/userid
/* example body
{ 
	"walkerId": "5ddf04dd765a2b0624face6c",
	"dogId" : "5ddf258ceae46928e0e903ac",
	"walkNeeds" : [ "hyper", "puppy" ],
	"duration" : 10,
	"price" : 20
}
*/
app.post('/walk', (req, res) => {
	// Add code here
    const walkerId = req.body.walkerId;
    const dogId = req.body.dogId;
	
	if (!ObjectID.isValid(walkerId) || !ObjectID.isValid(dogId)) {
		res.status(404).send();
	}
	const walk = new Walk({
        walkerId: walkerId,
        dogId: dogId,
        walkNeeds: req.body.walkNeeds,
        price: req.body.price,
        duration: req.body.duration,
        notes: [],
        locations: []
    });
    
    walk.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    })

    //TODO: update dog's walk needs to have these walk needs
})

// Route for getting information for a walk
app.get('/walk/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}
	
	Walk.findById(id).then((walk) => {
		if (!walk) {
			res.status(404).send(); //could not find walk
		} else {
			res.send(walk);
		}
	}).catch((error) => {
		res.status(500).send(); //server error
	});

})

// Route for changing properties of a walk
/* example bodies:
{
    startNow: true,
    notes: ["Heading out"],
    accepted: true,
    location: { x: 20, y: 20 }
}
{
    endNow: true,
    dogRating: 5,
    notes: ["We're back"],
    completed: true,
    location: { x: 10, y: 10 }
}
{
    walkerRating: 5
}
*/
app.patch('/walk/:id', (req, res) => {
    const id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

    /* TODO for this part
        - only walkers should be able to update all fields except walkerRating
        - only users should be able to update walkerRating
        - price should be auto-updated based on duration and walk needs
    */

    //find the walk and update it
	Walk.findById(id).then((walk) => {
		if (!walk) {
			res.status(404).send(); //could not find walk
		} else {
            if (req.body.price) {
                walk.price = req.body.price;
            }
            if (req.body.accepted) {
                if (walk.startTime) {
                    //walk is already started
                    res.status(422).send(); //invalid update
                }
                else {
                    walk.startTime = new Date();
                    walk.accepted = true;
                }
            }
            if (req.body.completed) {
                if (walk.endTime) {
                    //walk is already ended
                    res.status(422).send(); //invalid update
                }
                else {
                    walk.endTime = new Date();
                    walk.completed = true;
                    walk.duration = Math.round((((walk.endTime - walk.StartTime) % 86400000) % 3600000) / 60000);
                }
            }
            if (req.body.walkerRating && walk.completed) {
                walk.walkerRating = req.body.walkerRating;
            }
            if (req.body.dogRating && walk.completed) {
                walk.dogRating = req.body.dogRating;
            }

            
		}
	}).catch((error) => {
		res.status(500).send(); //server error
	});


})

//TODO: PATCH walk

/** Report resource routes **/
//TODO: POST report
//TODO: PATCH report
//TODO: GET report

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