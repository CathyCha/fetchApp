"use strict";

/*******************
 * class definitions
 *******************/

class Walker {
    constructor(name, picture, rating, description) {
        this.name = name;
        this.picture = picture;
        this.rating = rating;
        this.description = description;
    }
}

/******************************
 * Location input functionality
 ******************************/
//Note: the first two are forms, the third is a textarea
const coordinateForm = document.querySelector('#coordinates-form');
const addressForm = document.querySelector('#address-form');
const pickupInstructions = document.querySelector('#pickup-instructions-textarea');

//filter for numbers only
coordinateForm.addEventListener('input', function() {
    this.children[0].value = this.children[0].value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/([^-]+)-/g, '$1');
    this.children[1].value = this.children[1].value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/([^-]+)-/g, '$1');
  });

//find matching walkers if location changes
coordinateForm.addEventListener('submit', doSomething);
coordinateForm.addEventListener('change', doSomething);
addressForm.addEventListener('submit', doSomething);
addressForm.addEventListener('change', doSomething);
pickupInstructions.addEventListener('change', doSomething);

/* Test walker */
const johnDescription = "Hi! My name is John and I'm a generic dog walker. Please hire me, I have tuition to pay. Also I love dogs.";
const john = new Walker("John Smith", "profilepic.png", 4.42, johnDescription);

function doSomething(e) {
    e.preventDefault();
    const NCoordinate = coordinateForm.children[0].value;
    const ECoordinate = coordinateForm.children[1].value;
    if (NCoordinate && ECoordinate) {
        console.log("Client requesting a walker at: " + NCoordinate + "N, " + NCoordinate + "E");
    }

    const address = addressForm.children[0].value;
    if (address) {
        console.log("Client's address: " + address);
    }

    const instructions = pickupInstructions.value;
    if (instructions) {
        console.log("Provided pickup instructions: " + instructions);
    }

    if (NCoordinate && ECoordinate && address && instructions) {
        //here the server would be queried to find available nearby walkers
        //instead we just use john.
        addWalker(john);
    }
}

/****************************
 * Setting walk cost estimate
 ****************************/
let numWalkNeeds = 0;
let walkLength = 30;

const price = document.querySelector('#price');

function updateCostEstimate() {
    const priceEstimate = 8 + 2*walkLength/5 + 5*numWalkNeeds;
    price.innerText = "$" + priceEstimate.toString(10);
}

/************************
 * Walk length slider bar
 ************************/

const walkLengthSlider = document.querySelector('#walk-length-slider');
const walkLengthLabel = document.querySelector('#walk-length-number');

walkLengthSlider.addEventListener('input', updateWalkSlider);

//TODO: add functionality to only allow certain values: 5, 10, 15, 20, 30, 45, 60, 75, 90, 120 mins
function updateWalkSlider(e) {
    walkLengthLabel.innerText = walkLengthSlider.value + "min";
    walkLength = walkLengthSlider.value;
    updateCostEstimate();
}

/*******************
 * Walk needs toggle
 ******************/

const walkNeeds = document.querySelector('#walk-needs-container');
walkNeeds.addEventListener('click', toggleNeed);

function toggleNeed(e) {
    e.preventDefault();

    if (e.target.classList.contains('walk-need')) {
        //select the styling for the need that was clicked on 
        const need = e.target.style;
        if (need.backgroundColor === "" || need.backgroundColor == "white") { 
            need.backgroundColor = "black";
            need.color = "white";
            
            //update number of needs for pricing
            numWalkNeeds++;
        }
        else {
            need.backgroundColor = "white";
            need.color = "black";

            //update number of needs for pricing
            numWalkNeeds--;
        }
        updateCostEstimate();
    }
}

/**********************************
 * manipulating walkers on the page
 **********************************/

function addWalker(walker) {

    //get the area to add the walker
    const walkerArea = document.querySelector('#right-pane-body');
    
    const walkerDiv = document.createElement("div");
    walkerDiv.classList.add("walker");

    //add walker to walker area
    walkerArea.appendChild(walkerDiv);

    const walkerPic = document.createElement("img");
    walkerPic.classList.add("walker-pic");
    walkerPic.src = walker.picture;

    const walkerBio = document.createElement("div");
    walkerBio.classList.add("walker-bio");

    //add pic and description to walker
    walkerDiv.appendChild(walkerPic);
    walkerDiv.appendChild(walkerBio);

    const walkerName = document.createElement("span");
    walkerName.classList.add("walker-name");
    walkerName.innerText = walker.name;

    //add bio elements to walker bio
    walkerBio.appendChild(walkerName);

    const rating = document.createElement("span");
    rating.classList.add("rating");

    //add rating to the bio
    walkerBio.appendChild(rating);

    const ratingStars = document.createElement("span");
    ratingStars.classList.add("rating-stars");

    let numStars = Math.floor(walker.rating);
    const fullStar = "\u2605";
    const emptyStar = "\u2606";
    ratingStars.innerText = fullStar.repeat(numStars);
    ratingStars.innerText = ratingStars.innerText.concat(emptyStar.repeat(5 - numStars));

    //add the stars to the rating
    rating.appendChild(ratingStars);

    const ratingNumber = document.createElement("span");
    ratingNumber.classList.add("rating-number");
    ratingNumber.innerText = walker.rating.toString(10);

    //add the number to the rating
    rating.appendChild(ratingNumber);

    const desc = document.createElement("p");
    desc.classList.add("walker-description");
    desc.innerText = walker.description;

    walkerBio.appendChild(desc);
}

//get the walker display area
const walkerArea = document.querySelector('#right-pane-body');
walkerArea.addEventListener('click', selectWalker);

//variable to store popup when walker has been selected
let selectWalkerPopup = null;

function selectWalker(e) {
    console.dir(e);
    //only allow selecting one walker at a time
    if (selectWalkerPopup != null) {
        return;
    }

    let targetWalker = e.target;
    while (!(targetWalker.classList.contains("walker"))) {
        targetWalker = targetWalker.parentElement;
    }

    //get walker's data
    const walkerPic = targetWalker.children[0].src;
    targetWalker = targetWalker.children[1];
    const walkerName = targetWalker.children[0].innerText;
    const walkerRating = targetWalker.children[1].children[1].innerText;
    const walkerRatingStars = targetWalker.children[1].children[0].innerText;

    console.log(walkerPic, walkerName, walkerRating);

    //box for the popup
    selectWalkerPopup = document.createElement("div");
    selectWalkerPopup.classList.add("walkerPopup");

    //add walker's picture
    const walkerImage = document.createElement("img");
    walkerImage.classList.add("walker-popup-image");
    walkerImage.src = walkerPic;
    selectWalkerPopup.appendChild(walkerImage);

    //add walker's name
    const walkerNameSpan = document.createElement("span");
    walkerNameSpan.classList.add("walker-popup-name");
    walkerNameSpan.innerText = walkerName;
    selectWalkerPopup.appendChild(walkerNameSpan);

    //add walker's rating
    const walkerRatingDisplay = document.createElement("div");
    
    const walkerRatingStarsSpan = document.createElement("span");
    walkerRatingStarsSpan.classList.add("walker-popup-stars");
    walkerRatingStarsSpan.innerText = walkerRatingStars;

    const walkerRatingNumberSpan = document.createElement("span");
    walkerRatingNumberSpan.classList.add("walker-popup-rating");
    walkerRatingNumberSpan.innerText = walkerRating;

    walkerRatingDisplay.appendChild(walkerRatingStarsSpan);
    walkerRatingDisplay.appendChild(walkerRatingNumberSpan);
    selectWalkerPopup.appendChild(walkerRatingDisplay);

    
    //add box as child for area
    const walkerArea = document.querySelector("#right-pane-body");
    walkerArea.appendChild(selectWalkerPopup);

}

function removePopup() {
    selectwalkerPopup = null;
    //removeChild function here
}