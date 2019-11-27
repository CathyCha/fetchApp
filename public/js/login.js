"use strict";

// function to check whether user is admin or user (Dog or Walker)
// to be implemented properly after phase 1
document.documentElement.addEventListener("keyup", checkSubmit, false);

function checkSubmit(e) {
   if(e && e.keyCode == 13) {
      // user and pass = valid dog user
      if (e.target.value == "user") { //Dog
        window.location.replace("userProfile.html");
      }
      // user and pass = valid walker user
      else if (e.target.value == "user2") { //Walker
        window.location.replace("walkerProfile.html");
      }
      //user and pass = valid admin
      else if (e.target.value == "admin") {
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

$('#regOwner').click(function() {
    $(this).attr("id", "regOwner:focus")
});

$('#regWalker').click(function() {
    $(this).attr("id", "regWalker:focus")
});
