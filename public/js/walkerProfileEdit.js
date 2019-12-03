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
        document.querySelector("#fname").value = json.firstName;
        document.querySelector("#lname").value = json.lastName;
        document.querySelector("#emailAddress").value = json.emailAddress;
        document.querySelector("#adrs").value = json.homeAddress | "";
        document.querySelector("#inputCity").value = json.city || "";
        document.querySelector("#inputProv").value = json.province || "";
        document.querySelector("#description").value = json.description || "";

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
            console.log(error);
        }
    })
}
