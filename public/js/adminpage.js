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
  }).then((json) => {
    const table = $('#reportTable');
    table.find("tbody tr").remove();
    
    json.reports.forEach((report, index) => {
      table.append("<tr><td>" + report._id + "</td><td>" + report.type + "</td></td>" +
      report.user + "</td><td>" + report.status + "</td><td>" + report.action + "</td></tr>");
    })
  }).catch((error) => {
    console.log(error);
  })
}

function populateOwnerTable() {
  // populates the all dog users table
  // get all users with dogs
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
    console.log(walks)
        const table = $('#walkTable');
        $.each(walks, function(index, value) {
          console.log(value)
          // TODO
          // current routes not working to get all walks

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
