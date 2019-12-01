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
            console.log("Error " + res.status + ": Could not get students");
            return Promise.reject(res.status);
        }
    }).then((json) => {
        console.log(json);
        document.querySelector("#fname").value = json.firstName;
        document.querySelector("#lname").value = json.lastName;
        document.querySelector("#emailAddress").value = json.emailAddress;
        document.querySelector("#adrs").value = json.homeAddress;
        document.querySelector("#inputCity").value = json.city;
        document.querySelector("#inputProv").value = json.province;
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

function uploadFile(file) {
    const url = "/upload";
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    }).then((res) => {
        console.log("success?", res);
    }).catch((error) => {
        console.log("error?", error);
    });
}

//event handler for submitting
function submitChanges(e) {
    const requestBody = {
        fname: document.querySelector("#fname"),
        lname: document.querySelector("#lname"),
    }
}

