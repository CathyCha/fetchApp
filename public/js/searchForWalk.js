"use strict";
class User {
    constructor(name, picture, rating, description) {
        this.name = name;
        this.picture = picture;
        this.rating = rating;
        this.description = description;

    }
}

class walkRequest {
  constructor(xCoord, yCoord, length, needs, price){
    this.x = xCoord
    this.y = yCoord
    this.length = length
    this.needs = needs
    this.price = price
  }
}
const rufusDescription = "energetic and playful, quite the handul!"; // These fields would normally be filled by the server
const rufusNeeds = new Array("Hyperactive", "Treats", "Puppy", "Water breaks")

const rufus = new User("Rufus", "rufus.jpg", 4.42, rufusDescription);
const req = new walkRequest(680, 330, 30, rufusNeeds, 25)

const search = document.querySelector("#searchForWalkButton");
const searchButton = document.getElementById("searchForWalkButton");
let accept = null;
const map = document.getElementById("map")
let marker = null;

//initialize the page
window.addEventListener("load", initializePage);

function initializePage(e) {
  const url = '/walker';
  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    else {
      console.log("Error " + res.status + ": Could not get user data");
      if (res.status === 404) {
        alert("Session expired! Please log in again");
        window.location.href = "login.html";
      }
      else {
        return Promise.reject(res.status);
      }
    }
  }).then((json) => {
    //if needed, can save ID here - but probably don't need

    if (json.active) { //user is already active
      search.addEventListener('click', setInactive);
      search.innerText = "Searching... Click to cancel";
    }
    else { //user is not active
      search.addEventListener('click', setActive);
      searchButton.innerText = "Find Walk";
    }
  }).catch((error) => {
    console.log(error);
  });
  
}

/* Functions to handle button clicking */
function setActive(e) {
  e.preventDefault();

  const url = "/walker";
  const requestBody = {
    active: true
  };

  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify(requestBody),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  fetch(request).then((res) => {
    if (res.status === 200) {
      search.innerText = "Searching... Click to cancel";
      search.removeEventListener("click", setActive);
      search.addEventListener("click", setInactive);
    }
  })
}

function setInactive(e) {
  e.preventDefault();

  const url = "/walker";
  const requestBody = {
    active: false
  };

  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify(requestBody),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  fetch(request).then((res) => {
    if (res.status === 200) {
      search.innerText = "Find Walk";
      search.removeEventListener("click", setInactive);
      search.addEventListener("click", setActive);
    }
  })
}

/* Function to handle the user clicking on the map */
function walkFound() {
    const markerRadius = 10;
    const xCoordinate = 680; // Fixed testing point for new walk
    const yCoordinate = 330;

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
    fillWalkInfo(rufus, req)
    searchButton.innerText = "Find Walk"
}




function fillWalkInfo(dog, request){
  const info = document.getElementById("dog-info");
  while(info.firstChild){
    info.removeChild(info.firstChild) // remove all child elements
  }
  const pic = document.createElement("img")
  pic.src = dog.picture
  pic.className = "user-pic"
  info.appendChild(pic)

  const bio = document.createElement("div")
  bio.className = "user-bio"

  const name = document.createElement("span")
  const nameTxt = document.createTextNode(dog.name)
  name.className = "user-name"
  name.appendChild(nameTxt)
  bio.appendChild(name)

  const rating = document.createElement("div")
  rating.className = "rating"

  const rating_stars = document.createElement("span")
  const starTxt = document.createTextNode("★")
  rating_stars.className = "rating-stars"
  rating_stars.appendChild(starTxt)
  rating.appendChild(rating_stars)

  const rating_number = document.createElement("span")
  const number = document.createTextNode(dog.rating)
  rating_number.className = "rating-number"
  rating_number.appendChild(number)
  rating.appendChild(rating_number)

  bio.appendChild(rating)

  const desc = document.createElement("p")
  const desc_txt = document.createTextNode(dog.description)
  desc.className = "user-description"
  desc.appendChild(desc_txt)
  bio.appendChild(desc_txt)
  info.appendChild(bio)

  const walkLenDiv = document.getElementById("walk-length")
  while(walkLenDiv.firstChild){
    walkLenDiv.removeChild(walkLenDiv.firstChild) // remove all child elements
  }
  const walkLenLabel = document.createElement("span")
  const walkLenTxt = document.createTextNode("Walk Length")
  walkLenLabel.className = "label"
  walkLenLabel.appendChild(walkLenTxt)

  const walkLenNumber = document.createElement("span")
  walkLenNumber.className = "walk-length-number"
  const walkLenNumberTxt = document.createTextNode(request.length.toString() + "min")
  walkLenNumber.appendChild(walkLenNumberTxt)

  walkLenDiv.appendChild(walkLenLabel)
  walkLenDiv.appendChild(walkLenNumber)

  const walkNeedsDiv = document.getElementById("walk-needs")
  while(walkNeedsDiv.firstChild){
    walkNeedsDiv.removeChild(walkNeedsDiv.firstChild) // remove all child elements
  }

  const walkNeedsLabel = document.createElement("span")
  const walkNeedsTxt = document.createTextNode("Walk Needs")
  walkNeedsLabel.className = "label"
  walkNeedsLabel.appendChild(walkNeedsTxt)
  walkNeedsDiv.appendChild(walkNeedsLabel)

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

  walkNeedsDiv.appendChild(walkNeedsContainer)

  const priceEstDiv = document.getElementById("price-estimate")
  while(priceEstDiv.firstChild){
    priceEstDiv.removeChild(priceEstDiv.firstChild) // remove all child elements
  }
  const priceEstLabel = document.createElement("span")
  priceEstLabel.className = "label"
  const priceEstTxt = document.createTextNode("Estimated price")
  priceEstLabel.appendChild(priceEstTxt)
  priceEstDiv.appendChild(priceEstLabel)

  const priceEst = document.createElement("span")
  const price = document.createTextNode("$" + request.price.toString())
  priceEst.id = "price"
  priceEst.appendChild(price)
  priceEstDiv.appendChild(priceEst)

  const button = document.getElementById("acceptJobButton")
  if(!button){
    const newButton = document.createElement("button")
    newButton.id = "acceptJobButton"
    const newButtonTxt = document.createTextNode("Start Walk")
    newButton.appendChild(newButtonTxt)
    const parent = document.getElementById("walk-container")
    parent.appendChild(newButton)
    accept = document.querySelector("#acceptJobButton")
    accept.addEventListener('click', function(){
      redirect();
    })
  }

}

function walkAccepted() {
    statusMessage.innerText = "Walk accepted";
    setTimeout(redirect, 1000);
}

function redirect() {
    window.location.href = 'walk.html';
}
