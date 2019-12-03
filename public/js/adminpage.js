"use strict";

function editButton() {
  window.location.href='profileEdit.html';
}

// DELETE route
function deleteacc() {
  alert('Are you sure you want to delete this account? You can not restore the account once it is deleted');
  alert('Account deleted.');
  window.location.replace('index.html');
}



function profileupload() {
  alert('Upload Profile Picture from Location');
}

// -------------------------------------------------------
// -------------------------------------------------------
// --------- Functions to be added after phase 1 ---------
// Functions that need access to data and server calls
// -------------------------------------------------------
// -------------------------------------------------------

function populateReportTable() {
  // populates the reports data table
  const url = '/report';
  fetch(url).then((res) => {
    if (res.status === 200) {
          return res.json();
        }
        else {
          return Promise.reject();
        }
    }).then(reports => {
      const table = $('#reportTable');
      table.find("tbody tr").remove();
      const eachreports = reports.reports;

      $.each(eachreports, function (index, value) {

          table.append("<tr><td>" + value._id + "</td><td>" + value.type + "</td><td class='walker'>" +
          value.walkerId + "</td><td class='user'>" + value.userId + "</td><td class='dog'>" + value.dogId +
          "</td><td class='status'>" + value.status + "</td><td class='action'>" + value.action + "</td></tr>");
      });
      reportwalker();
      reportuser();
      reportaction();
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

// helper function for populateReportTable
// gets the names of the user
function reportwalker() {
  const walkerID = document.getElementsByClassName("walker")
  for(let i=0; i < walkerID.length; i++){
    const url = '/walker/' + walkerID[i].innerText;
    fetch(url).then((res) => {
    if (res.status === 200) {
        return res.json();
    }
    else {
        console.log("Error " + res.status + ": Could not get walker data");
        return Promise.reject(res.status);
      }
    }).then((walker) => {
      walkerID[i].innerText = walker.firstName + " " + walker.lastName;
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
}

// helper function for populateReportTable
// gets the users names
function reportuser() {
  const userID = document.getElementsByClassName("user")
  const dogID = document.getElementsByClassName("dog");
  for(let i=0; i < userID.length; i++){
    const dog = dogID[i].innerText;
    const url = '/user/' + userID[i].innerText;
    fetch(url).then((res) => {
    if (res.status === 200) {
        return res.json();
    }
    else {
        console.log("Error " + res.status + ": Could not get user data");
        return Promise.reject(res.status);
      }
    }).then((user) => {
      userID[i].innerText = user.firstName + " " + user.lastName;
      for (let j=0; j < user.userDogs.length; j++) {
        if(user.userDogs[j]._id == dog){
          dogID[i].innerText = user.userDogs[j].dogName
        }
      }
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
}

// helper function for populateReportTable
// lets the admin perform an action
function reportaction(){
  const action = document.getElementsByClassName("action");

  for(let i=0; i<action.length; i++){
    if(action[i].innerText == 'Pending'){
      action[i].innerHTML = "<button type='button' class='btn btn-primary btn-sm refundButton' onclick='refund()'>Refund</button>" +
      "<button type='button' class='btn btn-secondary btn-sm rejectButton' onclick='reject()'>Reject</button>"
    }
  }
}

// refund button onclick function
function refund(){
  alert("Refunded")

  //reload the table to reflect new patch
  populateReportTable();
}

//reject button onclick function
function reject(){
  alert("Rejected")

  //reload the table to reflect new patch
  populateReportTable();
}

// populates the all owners table
function populateOwnerTable() {
  const url = '/allusers';

  fetch(url).then((res) => {
    if (res.status === 200) {
        return res.json();
    }
    else {
        console.log("Error " + res.status + ": Could not get walker data");
        return Promise.reject(res.status);
    }
    }).then((users) => {
        const table = $('#ownerTable');
        $.each(users, function(index, value) {
          console.log(value)
          table.append("<tr><td class=ownerID>" + value._id + "</td><td>" + value.firstName + " " + value.lastName + "</td><td>" +
          value.city + "</td><td>" + value.emailAddress + "</td><td>" + "<select class='dogs'>" +
          "</select>" + "</td><td>" + new Date(value.dateJoined).toLocaleDateString() + "</td></tr>");
        })
        ownerTableHelper();
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

function ownerTableHelper() {
   const owners = document.getElementsByClassName("ownerID")
   for(let i=0; i < owners.length; i++){
     const url = '/user/' + owners[i].innerText;
     fetch(url).then((res) => {
     if (res.status === 200) {
         return res.json();
     }
     else {
         console.log("Error " + res.status + ": Could not get user data");
         return Promise.reject(res.status);
       }
     }).then((user) => {
       $.each(user.userDogs, function(index, value){
         const dogSelect = document.getElementsByClassName("dogs")[i];
         const dogoption = document.createElement("option");
         const dogoptiontxt = document.createTextNode(value.dogName);
         dogoption.appendChild(dogoptiontxt);
         dogSelect.appendChild(dogoption);
       })
     })
   }
}

function populateWalkerTable() {
  // populates the all walker users table
  const url = '/walker'

  fetch(url).then((res) => {
    if (res.status === 200) {
        return res.json();
    }
    else {
        console.log("Error " + res.status + ": Could not get walker data");
        return Promise.reject(res.status);
    }
  }).then((walkers) => {
        const table = $('#walkerTable');
        $.each(walkers, function(index, value) {
          console.log(value)
          table.append("<tr><td>" + value._id + "</td><td>" + value.firstName + " " + value.lastName + "</td><td>" +
          value.city + "</td><td>" + value.emailAddress + "</td><td>" + new Date(value.dateJoined).toLocaleDateString()
          + "</td><td>" + value.ratings + "</td></tr>");
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

function populateAllWalks() {
  // manipulates DOM to show all walks in data
  const url = '/walk'
  fetch(url).then((res) => {
    if (res.status === 200) {
        return res.json();
    }
    else {
        console.log("Error " + res.status + ": Could not get walk data");
        return Promise.reject(res.status);
    }
  }).then((walks) => {
      const table = $('#walkTable');
      $.each(walks, function(index, value) {

        table.append("<tr><td>" + value._id + "</td><td class='walker'>" + value.walkerId + "</td><td class='user'>" +
        value.userId + "</td><td class='dog'>" + value.dogId + "</td><td>" + new Date(value.dateJoined).toLocaleDateString() +
        "</td><td>"  + value.duration + "</td><td>" + value.price + "</td></tr>");

      })
      walkerName();
      userName();
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

// helper function for walk table
// gets walker names
function walkerName() {
  const walkerID = document.getElementsByClassName("walker");

  for (let i=0; i<walkerID.length; i++) {
    const url = '/walker/' + walkerID[i].innerText;
    fetch(url).then((res) => {
      if (res.status === 200) {
          return res.json();
      }
      else {
          console.log("Error " + res.status + ": Could not get walk data");
          return Promise.reject(res.status);
      }
    }).then((walker) => {
        walkerID[i].innerText = walker.firstName + " " + walker.lastName;
    })
  }
}

// helper function for walk table
// gets user names and dog names
function userName() {
  const userID = document.getElementsByClassName("user");
  const dogID = document.getElementsByClassName("dog");

  for (let i=0; i<userID.length; i++) {
    const dog = dogID[i].innerText;
    const url = '/user/' + userID[i].innerText;
    fetch(url).then((res) => {
      if (res.status === 200) {
          return res.json();
      }
      else {
          console.log("Error " + res.status + ": Could not get walk data");
          return Promise.reject(res.status);
      }
    }).then((user) => {
        userID[i].innerText = user.firstName + " " + user.lastName;
        for (let j=0; j<user.userDogs.length; j++) {
          if(user.userDogs[j]._id == dog){
            dogID[i].innerText = user.userDogs[j].dogName
          }
        }
    })
  }
}


function searchTable(tid) {
  // changes DOM to return the ID in search
  // @param tid: string object containing id of table
  console.log(tid)
  const table = document.getElementById(tid);
  const rid = document.getElementById('searchReport').value
  const tr = table.getElementsByTagName("tr")
  let td;
  for(let i = 1; i < tr.length; i++){
    td = tr[i].getElementsByTagName("th")[0]
    if (td) {
      let val = td.textContent || td.innerText
      if(val.indexOf(rid) > -1){
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
