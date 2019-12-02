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

// Direct to index
function signout() {
  alert('Successfully signed out');
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

function populateReportTable(reports) {
  // populates the reports data table
  const table = $('#reportTable');
  table.find("tbody tr").remove();
  reports.forEach(function (reports) {
        table.append("<tr><td>" + reports.id + "</td><td>" + reports.type + "</td></td>" +
        reports.user + "</td><td>" + reports.status + "</td><td>" + reports.action + "</td></tr>");
  });
}

function searchReports(rid, reports) {
  // changes DOM to return the Report ID in search

  // check if rid exists
  if (!ObjectID.isValid(rid)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
	}

  const table = $('#reportTable');
  table.find("tbody tr").remove();

  const url = "/reports"
  reports.find
}

function populateDogTable(owners) {
  // populates the all dog users table
  const table = $('#ownerTable');
  table.find("tbody tr").remove();
  owners.forEach(function (owners) {
        table.append("<tr><td>" + owners.id + "</td><td>" + owners.name + "</td></td>" +
        owners.city + "</td><td>" + owners.email + "</td><td>" + owners.dogs +  "</td><td>" +
        owners.dateJoined + "</td></tr>");
  });
}

function searchUser(uid) {
  // changes DOM to return the Dog User ID in search
  const url = `/user/:${uid}`

  // Fetch user from server
  // Get request doesn't require an object.
  fetch(url).then((res) => {
    if (res.status === 200){
      return res.json()
    } else {
      alert('Could not find user')
    }
  }).then((json) => {
    //TODO: Do something
    console.log(json)
  })
}

function populateWalkerTable(walkers) {
  // populates the all walker users table
  const table = $('#walkerTable');
  table.find("tbody tr").remove();
  walkers.forEach(function (walkers) {
        table.append("<tr><td>" + walkers.id + "</td><td>" + walkers.name + "</td></td>" +
        walkers.city + "</td><td>" + walkers.email + "</td><td>" + walkers.dateJoined +  "</td><td>" +
        owners.rating + "</td></tr>");
  });

}

function searchWalker() {
  // changes DOM to return the Walker User ID in search
}

function populateAllWalks() {
  // manipulates DOM to show all walks in data

}
