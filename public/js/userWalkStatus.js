"use strict";

//TODO: add walker location and pickup location
//TODO: add rating screen after time hits 0

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

/* Test walker */
const johnDescription = "Hi! My name is John and I'm a generic dog walker. Please hire me, I have tuition to pay. Also I love dogs.";
const john = new Walker("John Smith", "images/profilepic.png", 4.42, johnDescription);

/***********************
 * Add a new walker note
 **********************/

function addWalkerNote(message) {
    const notesList = document.querySelector("#notes-div").children[0];
    const newNote = document.createElement("li");
    newNote.innerText = message;
    notesList.appendChild(newNote);
}

/*********************
 * Update time left
 ***********************/

let timeLeft = 31;
let walkerNotes = ["Cute dog", "Stopped for water", "Fought with another dog", "Won the fight", "Heading back"];
let xCoordinates = [475, 520, 705, 632, 383, 346, 436];
let yCoordinates = [215, 375, 400, 591, 563, 344, 235];
let updateIndex = 0;

const updatePageInterval = setInterval(updatePage, 1000);

function updateTimeLeft(minutes) {
    const finishTime = document.querySelector("#finish-time");
    finishTime.innerText = minutes.toString(10) + " min";
}

function updatePage() {
    //query server for walker's current status
    //here we simulate a walk in progress
    if (timeLeft > 0) {
        timeLeft--;
        updateTimeLeft(timeLeft);
        if (timeLeft % 5 == 0) {
            if (updateIndex < walkerNotes.length) {
                addWalkerNote(walkerNotes[updateIndex]);
            }
            if (updateIndex < xCoordinates.length) {
                updateWalkerMarkerLocation(xCoordinates[updateIndex], yCoordinates[updateIndex]);
            }
            updateIndex++;
        }
    }
    else {
        clearInterval(updatePageInterval);
        finishWalk();
    }
}

/***************************************
 * Finish walk and walker rating options
 ***************************************/

let rating = 0; //user-entered rating
let stars = [];
let ratingDescriptions = ["Horrendous", "Terrible", "Decent", "Okay", "Great"];
let ratingText = null;
let feedbackDiv = null;
let doneButton = null;

function finishWalk() {
    //resize the picture
    const walkerPic = document.querySelector(".walker-popup-image");
    walkerPic.style.maxHeight = "100px";
    walkerPic.style.maxWidth = "100px";
    walkerPic.nextSibling.remove();
    walkerPic.nextSibling.remove();

    //text to request a rating for the walker
    const ratingRequest = document.createElement("h4");
    ratingRequest.classList.add("rating-request");
    ratingRequest.innerText = "Please rate your Walker";
    walkerPic.after(ratingRequest);

    //create a div to hold the stars
    const starsSpan = document.createElement("span");
    starsSpan.classList.add("stars-span");
    starsSpan.addEventListener("mouseleave", resetStars)
    ratingRequest.after(starsSpan);

    //create the five stars
    for (let i = 0; i < 5; i++) {
        const star = document.createElement("span");
        star.classList.add("rating-star");
        star.innerText = "\u2606";
        star.addEventListener("mouseover", starMouseover);
        star.addEventListener("click", selectStar);
        stars.push(star);
        starsSpan.appendChild(star);
    }

    ratingText = document.createElement("p");
    ratingText.classList.add("rating-text");
    starsSpan.after(ratingText);

    //change page title
    document.title = "Walk complete!";
}

//animation for when the user hovers over the stars to select
function starMouseover(e) {
    //if the user has selected a rating, we do not do the animation
    if (rating != 0) {
        return;
    }

    //find which star was mouseovered
    const target = e.target;

    let selected = 0;
    for (let i = 0; i < 5; i++) {
        if (target == stars[i]) {
            selected = i + 1;
        }
    }

    //colour all stars to the left of and including the mouseovered one
    for (let i = 0; i < selected; i++) {
        stars[i].innerText = "\u2605";
    }
    //uncolour all other stars
    for (let i = selected; i < 5; i++) {
        stars[i].innerText = "\u2606";
    }
    //update text
    ratingText.innerText = ratingDescriptions[selected - 1];
}

//function to reset stars when the user stops hovering over them
function resetStars(e) {
    //if the user has selected a rating, we do not do the animation
    if (rating != 0) {
        return;
    }
    for (let i = 0; i < 5; i++) {
        stars[i].innerText = "\u2606";
    }
    ratingText.innerText = "";
}

function selectStar(e) {
    //find which star was mouseovered
    const target = e.target;

    rating = 0;
    for (let i = 0; i < 5; i++) {
        if (target == stars[i]) {
            rating = i + 1;
        }
    }

    //colour all stars to the left of and including the mouseovered one
    for (let i = 0; i < rating; i++) {
        stars[i].innerText = "\u2605";
    }
    //uncolour all other stars
    for (let i = rating; i < 5; i++) {
        stars[i].innerText = "\u2606";
    }
    //update text
    ratingText.innerText = ratingDescriptions[rating - 1];

    //if the user had a problem, prompt them for feedback
    if (rating < 5) {
        //do not add div more than once
        if (feedbackDiv == null) {
            feedbackDiv = document.createElement("div");
            feedbackDiv.classList.add("feedback-container");
            const feedbackOptions = ["Professionalism", "Lost", "Dog Neglected", "Need Not Met", "Other"];
            for (let i = 0; i < feedbackOptions.length; i++) {
                const feedback = document.createElement("span");
                feedback.classList.add("feedback");
                feedback.innerText = feedbackOptions[i];
                feedbackDiv.appendChild(feedback);
            }
            //add toggling
            feedbackDiv.addEventListener("click", toggleFeedback);
            //add after the rating
            document.querySelector(".rating-text").after(feedbackDiv);

            const reportProblemLink = document.createElement("p");
            reportProblemLink.classList.add("report-problem-link");
            reportProblemLink.innerText = "Report a problem with this walk";
            reportProblemLink.addEventListener("click", reportProblem);
            feedbackDiv.appendChild(reportProblemLink);
        }
    }

    //remove the feedback options if user changes their mind
    if (rating == 5) {
        if (feedbackDiv) {
            feedbackDiv.remove();
            feedbackDiv = null;
        }
    }

    //draw the done button
    if (doneButton == null) {
    doneButton = document.createElement("button");
    doneButton.classList.add("submit");
    doneButton.innerText = "Done";
    doneButton.addEventListener("click", submit);
    document.querySelector(".walkerDisplay").appendChild(doneButton);
    }
}

//change the feedback box colours
function toggleFeedback(e) {
    e.preventDefault();

    if (e.target.classList.contains('feedback')) {
        //select the styling for the need that was clicked on
        const feedback = e.target.style;
        if (feedback.backgroundColor === "" || feedback.backgroundColor == "white") {
            feedback.backgroundColor = "green";
            feedback.color = "white";
        }
        else {
            feedback.backgroundColor = "white";
            feedback.color = "green";
        }
    }
}

//allow the user to report an issue
function reportProblem(e) {
  if(!document.querySelector(".feedback-box")){
    const feedbackBox = document.createElement("textarea");
    feedbackBox.classList.add("feedback-box");
    feedbackBox.placeholder = "Please describe the problems you encountered.";
    document.querySelector(".report-problem-link").after(feedbackBox);
  }
}

function submit(e) {
    e.preventDefault();
    //submit all info to the server here
    window.location.replace("mywalk.html");
}

/***************************************************************
 * Show pickup location on the map and update the dog's location
 ***************************************************************/

let pickupMarker = null;
let walkerMarker = null;
let walkerBlink = false;
const markerRadius = 10; //this is used for styling purposes

function placePickupMarker(xCoordinate, yCoordinate) {
    pickupMarker = document.createElement("div");
    pickupMarker.classList.add("pickup-marker");
    pickupMarker.style.top = (yCoordinate - markerRadius).toString() + "px";
    pickupMarker.style.left = (xCoordinate - markerRadius).toString() + "px";
    document.querySelector("#map").appendChild(pickupMarker);
}

function placeWalkerMarker(xCoordinate, yCoordinate) {
    walkerMarker = document.createElement("div");
    walkerMarker.classList.add("walker-marker");
    walkerMarker.style.top = (yCoordinate - markerRadius).toString() + "px";
    walkerMarker.style.left = (xCoordinate - markerRadius).toString() + "px";
    document.querySelector("#map").appendChild(walkerMarker);
}

function updateWalkerMarkerLocation(xCoordinate, yCoordinate) {
    walkerMarker.style.top = (yCoordinate - markerRadius).toString() + "px";
    walkerMarker.style.left = (xCoordinate - markerRadius).toString() + "px";
}

function blinkWalkerMarker () {
    if (walkerBlink) {
        walkerMarker.style.borderColor = "orange";
        walkerMarker.style.backgroundColor = "white";
        walkerBlink = false;
        setTimeout(blinkWalkerMarker, 750);
    }
    else {
        walkerMarker.style.borderColor = "black";
        walkerMarker.style.backgroundColor = "orange";
        walkerBlink = true;
        setTimeout(blinkWalkerMarker, 1500);
    }
}

/******************************************************
 * Show the walker
 * - Do this dynamically since it will be a server call
 *****************************************************/

function displayWalker(walker) {

    //box for the popup
    const selectWalkerPopup = document.createElement("div");
    selectWalkerPopup.classList.add("walkerDisplay");

    //add walker's picture
    const walkerImage = document.createElement("img");
    walkerImage.classList.add("walker-popup-image");
    walkerImage.src = walker.picture;
    selectWalkerPopup.appendChild(walkerImage);

    //add walker's name
    const walkerNameSpan = document.createElement("span");
    walkerNameSpan.classList.add("walker-popup-name");
    walkerNameSpan.innerText = walker.name;
    selectWalkerPopup.appendChild(walkerNameSpan);

    //add walker's rating
    const walkerRatingDisplay = document.createElement("div");

    const walkerRatingStarsSpan = document.createElement("span");
    walkerRatingStarsSpan.classList.add("walker-popup-stars");
    walkerRatingStarsSpan.innerText = "\u2605";

    const walkerRatingNumberSpan = document.createElement("span");
    walkerRatingNumberSpan.classList.add("walker-popup-rating");
    walkerRatingNumberSpan.innerText = walker.rating;

    walkerRatingDisplay.appendChild(walkerRatingStarsSpan);
    walkerRatingDisplay.appendChild(walkerRatingNumberSpan);
    selectWalkerPopup.appendChild(walkerRatingDisplay);

    //add box as child for area
    const walkerArea = document.querySelector("#right-pane-body");
    walkerArea.appendChild(selectWalkerPopup);

}

/************************
 * Initialize the page
 ***********************/

(function initialize() {
    //get the pickup location from the server - here we use hardcoded values
    placePickupMarker(450, 220);
    //get the walker's location from the server - here we use hardcoded values
    placeWalkerMarker(475, 215);
    //start the blinking of the walker marker
    setTimeout(blinkWalkerMarker, 500);
    //get the walker's data from the server - here we just use john
    displayWalker(john);

})();
