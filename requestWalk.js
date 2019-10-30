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
 * Map click functionality
 ******************************/

/* Test walker */
const johnDescription = "Hi! My name is John and I'm a generic dog walker. Please hire me, I have tuition to pay. Also I love dogs.";
const john = new Walker("John Smith", "profilepic.png", 4.42, johnDescription);

function testAddWalker() {
    const johnDescription = "Hi! My name is John and I'm a generic dog walker. Please hire me, I have tuition to pay. Also I love dogs.";
    const john = new Walker("John Smith", "profilepic.png", 4.42, johnDescription);
    addWalker(john);
}

const map = document.querySelector("#map");
let marker = null;

/* Function to handle the user clicking on the map */
function mapClick(e) {
    const markerRadius = 10;
    const xCoordinate = e.layerX;
    const yCoordinate = e.layerY;
    //send these coordinates to the server and query nearby walkers
    addWalker(john);

    if (!marker) {
        marker = document.createElement("div");
        marker.classList.add("marker");
        marker.style.top = (yCoordinate - markerRadius).toString() + "px";
        marker.style.left = (xCoordinate - markerRadius).toString() + "px";
        map.appendChild(marker);
    }
    else {
        marker.style.top = (yCoordinate - markerRadius).toString() + "px";
        marker.style.left = (xCoordinate - markerRadius).toString() + "px";
    }
}


map.addEventListener('click', mapClick);


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
            need.backgroundColor = "green";
            need.color = "white";
            
            //update number of needs for pricing
            numWalkNeeds++;
        }
        else {
            need.backgroundColor = "white";
            need.color = "green";

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
    const walkerArea = document.querySelector('#walker-container');
    
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
    ratingStars.innerText = fullStar;

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
let savedWalkers = null;

function removePopup(e) {
    e.preventDefault();
    selectWalkerPopup.remove();
    selectWalkerPopup = -1;
    
    const walkerArea = document.querySelector("#right-pane-body");
    walkerArea.appendChild(savedWalkers);
    savedwalkers = null;
}

function selectWalker(e) {
    //clicking the no button causes this function to be called again, so suppress this extra call
    if (selectWalkerPopup === -1) {
        selectWalkerPopup = null;
        return;
    }
    
    /* not sure if still necessary - keeping in case */
    //only allow selecting one walker at a time
    if (selectWalkerPopup != null) {
        return;
    }

    savedWalkers = document.querySelector("#walker-container");
    savedWalkers.remove();


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

    const confirmationMessage = document.createElement("p");
    confirmationMessage.classList.add("popup-confirmation");
    confirmationMessage.innerText = "Hire this walker?"
    selectWalkerPopup.appendChild(confirmationMessage);

    const buttonsDiv = document.createElement("div");

    const yesButton = document.createElement("button");
    yesButton.classList.add("yes-button");
    yesButton.innerText = "Yes";

    const noButton = document.createElement("button");
    noButton.classList.add("no-button");
    noButton.innerText = "No";

    noButton.addEventListener("click", removePopup); 

    buttonsDiv.appendChild(yesButton);
    buttonsDiv.appendChild(noButton);

    selectWalkerPopup.appendChild(buttonsDiv);

    //add box as child for area
    const walkerArea = document.querySelector("#right-pane-body");
    walkerArea.appendChild(selectWalkerPopup);

}

