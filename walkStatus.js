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
const john = new Walker("John Smith", "profilepic.png", 4.42, johnDescription);

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
let walkerNotesIndex = 0;

const updatePageInterval = setInterval(updatePage, 1000);

function updateTimeLeft(minutes) {
    const finishTime = document.querySelector("#finish-time");
    finishTime.innerText = minutes.toString(10) + " min";
}

function updatePage() {
    if (timeLeft >= 0) {
        timeLeft--;
        updateTimeLeft(timeLeft);
        if (timeLeft % 5 == 0) {
            if (walkerNotesIndex < walkerNotes.length) {
                addWalkerNote(walkerNotes[walkerNotesIndex]);
                walkerNotesIndex++;
            }
        }
    }
    else {
        clearInterval(updatePageInterval);
        //TODO: ask user for walk feedback
    }
}


/******************************************************
 * Show the walker
 * - Do this dynamically since it will be a server call
 *****************************************************/

//get the walker's data from the server - here we just use john
displayWalker(john);

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