"use strict";

//TODO: add walker location and pickup location
//TODO: add rating screen after time hits 0

/*******************
 * class definitions
 *******************/

 class User {
     constructor(name, picture, rating, description) {
         this.name = name;
         this.picture = picture;
         this.rating = rating;
         this.description = description;

     }
 }

 class Request {
   constructor(xCoord, yCoord, length, needs, price){
     this.x = xCoord
     this.y = yCoord
     this.length = length
     this.needs = needs
     this.price = price
   }
 }

 const rufusDescription = "energetic and playful, quite the handul!";
 const rufusNeeds = new Array("Hyperactive", "Treats", "Puppy", "Water breaks")

 const rufus = new User("Rufus", "rufus.jpg", 4.42, rufusDescription);
 const req = new Request(680, 330, 30, rufusNeeds, 25)

/***********************
 * Add a new walker note
 **********************/

function addWalkerNote(message) {
    const notesList = document.getElementById("notes-div");
    const newNote = document.createElement("li");
    newNote.innerText = message;
    notesList.appendChild(newNote);
}

/*********************
 * Update time left
 ***********************/

let timeLeft = 31;
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
    if (timeLeft > 0) {
        timeLeft--;
        updateTimeLeft(timeLeft);
        if (timeLeft % 5 == 0) {
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
    const dogNeeds = document.getElementById("walk-needs-container")
    dogNeeds.parentNode.removeChild(dogNeeds)
    //resize the picture
    const walkerPic = document.querySelector(".walker-popup-image");
    walkerPic.style.maxHeight = "100px";
    walkerPic.style.maxWidth = "100px";
    walkerPic.nextSibling.remove();
    walkerPic.nextSibling.remove();

    //text to request a rating for the dog
    const ratingRequest = document.createElement("h4");
    ratingRequest.classList.add("rating-request");
    ratingRequest.innerText = "How did the walk go?";
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
    const notes = document.querySelector(".submitNoteForm")
    if(notes){
      notes.parentNode.removeChild(notes);
    }
    const submitNoteLabel = document.querySelector(".submitNoteLabel")
    if(submitNoteLabel){
      submitNoteLabel.parentNode.removeChild(submitNoteLabel)
    }
    //if the user had a problem, prompt them for feedback
    if (rating < 5) {
        //do not add div more than once
        if (!feedbackDiv) {

            feedbackDiv = document.createElement("div");
            feedbackDiv.classList.add("feedback-container");
            const feedbackOptions = ["Biting", "Misbehaved", "Aggressive", "Other"];
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
    console.log("I'm done!");
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

function displayUser(user, request) {

    //box for the popup
    const selectUserPopup = document.createElement("div");
    selectUserPopup.classList.add("walkerDisplay");

    //add walker's picture
    const userImage = document.createElement("img");
    userImage.classList.add("walker-popup-image");
    userImage.src = user.picture;
    selectUserPopup.appendChild(userImage);

    //add walker's name
    const userNameSpan = document.createElement("span");
    userNameSpan.classList.add("walker-popup-name");
    userNameSpan.innerText = user.name;
    selectUserPopup.appendChild(userNameSpan);

    //add walker's rating
    const userRatingDisplay = document.createElement("div");

    const userRatingStarsSpan = document.createElement("span");
    userRatingStarsSpan.classList.add("walker-popup-stars");
    userRatingStarsSpan.innerText = "\u2605";

    const userRatingNumberSpan = document.createElement("span");
    userRatingNumberSpan.classList.add("walker-popup-rating");
    userRatingNumberSpan.innerText = user.rating;

    userRatingDisplay.appendChild(userRatingStarsSpan);
    userRatingDisplay.appendChild(userRatingNumberSpan);
    selectUserPopup.appendChild(userRatingDisplay);

    const walkNeedsContainer = document.createElement("ul")
    walkNeedsContainer.id = "walk-needs-container"

    var newNeed;
    var newNeedTxt;
    request.needs.forEach(function(item, index){
      newNeed = document.createElement("li")
      newNeed.className = "walk-need"
      newNeedTxt = document.createTextNode(item)
      newNeed.appendChild(newNeedTxt)
      walkNeedsContainer.appendChild(newNeed)
      });

    selectUserPopup.appendChild(walkNeedsContainer)

    const submitNoteLabel = document.createElement("span")
    submitNoteLabel.className = "submitNoteLabel"
    submitNoteLabel.innerText = "Add Note"
    selectUserPopup.appendChild(submitNoteLabel)

    const submitNoteForm = document.createElement("form")
    const noteText = document.createElement("textarea")
    const submitNote = document.createElement("input")
    noteText.placeholder = "Write something.."
    submitNote.type = "submit"
    submitNote.onclick = function (e){
      addWalkerNote(noteText.value)
      e.preventDefault()};
    submitNoteForm.className = "submitNoteForm"
    submitNoteForm.appendChild(noteText)
    submitNoteForm.appendChild(submitNote)
    selectUserPopup.appendChild(submitNoteForm)

    //add box as child for area
    const userArea = document.querySelector("#right-pane-body");
    userArea.appendChild(selectUserPopup);



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
    displayUser(rufus, req);

})();
