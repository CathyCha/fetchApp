"use strict";

// function to check whether user is admin or user (Dog or Walker)
// to be implemented properly after phase 1
document.documentElement.addEventListener("keyup", checkSubmit, false);

function checkSubmit(e) {
   if(e && e.keyCode == 13) {
      // user and pass = valid dog user
      if (e.target.value == "Dog") {
        window.location.replace("requestWalk.html");
      }
      // user and pass = valid walker user
      else if (e.target.value == "Walker") {
        window.location.replace("userProfile.html");
      }
      //user and pass = valid admin
      else if (e.target.value == "Admin") {
        window.location.replace("adminpage.html");
      }
      // not a valid user
      else {
        alert("Password and username don't match");
      }
   }
}


// register as dog or walker
document.documentElement.addEventListener("click", handleAnchorClick, false);

function findParentByTagName(element, tagName) {
    var parent = element;
    while (parent !== null && parent.tagName !== tagName.toUpperCase()) {
        parent = parent.parentNode;
    }
    return parent;
}

function handleAnchorClick(event) {
    event = event || window.event;

    if (findParentByTagName(event.target || event.srcElement, "A")) {
        event.preventDefault();
        if (event.target.textContent == "Register as Dog") {
          const oldWind = window.location.href
          console.log(oldWind);
          window.location.replace("signup.html");
        }
        else if (event.target.textContent == "Register as Walker") {
          window.location.replace("signup.html");
        }
    }
}


// change the header of the registration form to Register as Walker or Dog
// to be implemented after phase 1 - when we can call external APIs from handleAnchorClick
function editWalker() {
  const header = getElementsByTagName("h1");
  // to be implemented after phase 1
}

function editDog() {
  const header = getElementsByTagName("h1");
  // to be implemented after phase 1
}
