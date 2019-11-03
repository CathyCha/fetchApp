"use strict";


function showProfile() {
    const userProf = "userProfile.html"
    window.location.href = userProf;

    // where the function would change the DOM of the userProfile html to reflect
    // the user in selection

}

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
