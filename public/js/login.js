"use strict";

// function to check whether user is admin or user (Dog or Walker)
// to be implemented properly after phase 1
document.documentElement.addEventListener("keyup", checkSubmit, false);

function checkSubmit(e) {
  if(e && e.keyCode == 13) {  
    const username = document.querySelector("#user").value;
    const password = document.querySelector("#pass").value;
    const userType = "user"; //TODO: get dynamically
    console.log(username, password, userType);

    //data to send in the request
    let data = {
      username: username,
      password: password,
      userType: userType
    }

    const url = '/login';

    const request = new Request(url, {
      method: 'post', 
      body: JSON.stringify(data),
      credentials: 'same-origin',
      redirect: 'follow',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      }
    });

    fetch(request).then((res) => {
      if (res.status === 200) {
        console.log("successfully logged in");
        //window.location.replace(res.url);
        //TODO: this doesn't register the session cookie in the browser..
      }
      else if (res.status === 401) {
        console.log("invalid username or password");
      }
      else if (res.status === 400) {
        console.log("request error");
      }
      else {
        console.log(res);
      }
    }).catch((error) => {
      console.log(error);
    });
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
