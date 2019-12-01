"use strict";

// Initialize the page
window.addEventListener("load", initializePage);
function initializePage(e) {
    //fill the boxes with the user's info
    const url = '/user';
    fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else {
            console.log("Error " + res.status + ": Could not get user data");
            return Promise.reject(res.status);
        }
    }).then((json) => {
        document.querySelector("#fname").innerText = json.firstName;
        document.querySelector("#lname").innerText = json.lastName;
        document.querySelector("#emailAddress").innerText = json.emailAddress;
        document.querySelector("#address").innerText = json.homeAddress + ", " + json.city + ", " + json.province;
        document.querySelector("#joinDate").innerText = niceDate(new Date(json.dateJoined));
        // let joinDate = new Date(json.dateJoined);
        // console.log(joinDate);
        // console.log(niceDate(joinDate));

        //check if the user has uploaded a picture
        const id = json._id;
        fetch("/images/uploaded/"+id+".jpg").then((res) => {
            if (res.status === 200) {
                document.querySelector("#media-object").src = "images/uploaded/" + id + ".jpg";
            }
        }).catch((error) => {
            //no image uploaded, but this is okay
        })

        displayDogs(json.userDogs);

    }).catch((error) => {
        if (error === 404) {
            alert("Session expired! Please log in again");
            window.location.href = "login.html";
        }
        else {
            console.log(error);
        }
    })
}

//helper function to prettify a date
function niceDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    if (day === 1) {
        return months[month] + " " + day + "st, " + year;
    }
    else if (day === 2) {
        return months[month] + " " + day + "nd, " + year;
    }
    else if (day === 3) {
        return months[month] + " " + day + "rd, " + year;
    }
    else {
        return months[month] + " " + day + "th, " + year;
    }
}

//helper function to display the user's dog(s)
//takes an array of dogs as input
function displayDogs(dogs) {
    dogs.forEach((dog, index) => {
        const dogInfoDiv = document.createElement("div");
        dogInfoDiv.classList.add("dog-info");
        
        const dogPic = document.createElement("img");
        dogPic.src = "images/rufus.jpg";
        dogPic.classList.add("user-pic");
        dogInfoDiv.appendChild(dogPic);

        const dogBioDiv = document.createElement("div");
        dogBioDiv.classList.add("user-bio");
        dogInfoDiv.appendChild(dogBioDiv);

        const dogNameSpan = document.createElement("span");
        dogNameSpan.classList.add("user-name");
        dogNameSpan.innerText = dog.dogName;
        dogBioDiv.appendChild(dogNameSpan);

        const ratingDiv = document.createElement("div");
        ratingDiv.classList.add("rating");
        dogBioDiv.appendChild(ratingDiv);

        const starsSpan = document.createElement("span");
        starsSpan.classList.add("rating-stars");
        starsSpan.innerText = "★";
        ratingDiv.appendChild(starsSpan);

        const ratingNumberSpan = document.createElement("span");
        ratingNumberSpan.classList.add("rating-number");
        ratingNumberSpan.innerText = average(dog.ratings);
        ratingDiv.appendChild(ratingNumberSpan);

        const weightSpan = document.createElement("span");
        weightSpan.classList.add("grey");
        weightSpan.innerText = dog.weight + "lbs";
        dogBioDiv.appendChild(weightSpan);

        document.querySelector(".user").appendChild(dogInfoDiv);
    })
}

//helper function to find the mean of an array of numbers
function average(array) {
    if (array.length == 0) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += parseInt(array[i], 10);
    }
    return (sum/array.length).toFixed(2);
}