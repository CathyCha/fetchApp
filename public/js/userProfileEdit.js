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
    if (!document.querySelector("#currpwd").value) {
        alert("Please enter your current password to make changes");
        return;
    }
    if (document.querySelector("#newpwd1").value !== document.querySelector("#newpwd2").value) {
        alert("New password fields do not match!");
        return;
    }

    const url = "/user";

    const requestBody = {
        fname: document.querySelector("#fname").value,
        lname: document.querySelector("#lname").value,
        email: document.querySelector("#emailAddress").value,
        adrs: document.querySelector("#adrs").value,
        city: document.querySelector("#inputCity").value,
        prov: document.querySelector("#inputProv").value,
    }
    console.log(requestBody);
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    console.log(request);

    fetch(request).then((res) => {
        if (res.status === 200) {
            console.log("Successfully posted");
            //put a message on the page to tell the user
            const statusMessage = document.querySelector("#status");
            statusMessage.innerText = "Successfully updated";
            statusMessage.style.color = "green";
        }
        else {
            console.log("Update failed", res.status);
        }
    }).catch((error) => {
        console.log(error);
    });
}

document.querySelector("#saveButton").addEventListener("click", submitChanges);

