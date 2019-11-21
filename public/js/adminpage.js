"use strict";

function editButton() {
  window.location.href='profileEdit.html';
}

function deleteacc() {
  alert('Are you sure you want to delete this account? You can not restore the account once it is deleted');
  alert('Account deleted.');
  window.location.replace('index.html');
}

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

function populateReportTable() {
  // populates the reports data table
  // DOM manipulation
  // updates with new report submissions
}

function searchReports() {
  // changes DOM to return the Report ID in search
}

function populateDogTable() {
  // populates the all dog users table
  // DOM manipulation
  // updates with new user registration
}

function searchUser() {
  // changes DOM to return the Dog User ID in search
}

function populateWalkerTable() {
  // populates the all walker users table
  // DOM manipulation
  // updates with new user registration
}

function searchWalker() {
  // changes DOM to return the Walker User ID in search
}

function populateAllWalks() {
  // manipulates DOM to show all walks in data
}
