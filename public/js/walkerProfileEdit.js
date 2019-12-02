"use strict";

window.addEventListener("load", initializePage);

function initializePage(e) {
    //fill the boxes with the walker's info
    const url = '/walker';
    fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else {
            console.log("Error " + res.status + ": Could not get walker data");
            return Promise.reject(res.status);
        }
    }).then((json) => {
        console.log(json);
        document.querySelector("#fname").innerText = json.firstName;
        document.querySelector("#lname").innerText = json.lastName;
        document.querySelector("#number").innerText = json.phoneNumber;
        document.querySelector("#email").innerText = json.emailAddress;
        document.querySelector("#qual").innerText = json.qualifications;
        document.querySelector("#lang").innerText = json.languages;

        const id = json._id;
        fetch("/images/uploaded/"+id+".jpg").then((res) => {
            if (res.status === 200) {
                document.querySelector("#defaultpp").src = "images/uploaded/" + id + ".jpg";
            }
        }).catch((error) => {
            //no image uploaded, but this is okay
        })
    }).catch((error) => {
        if (error === 404) {
            alert("Session expired! Please log in again");
            window.location.href = "login.html";
        }
        else {
            console.log("????");
        }
    })
}
