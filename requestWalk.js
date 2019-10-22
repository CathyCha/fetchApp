"use strict";

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

/****************************
 * adding walkers to the page
 ****************************/


function addWalker(walker) {
    ;
}