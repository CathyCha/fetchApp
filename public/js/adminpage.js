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

function populateReportTable(reports) {
  // populates the reports data table
  const table = $('#reportTable');
  table.find("tbody tr").remove();
  reports.forEach(function (reports) {
        table.append("<tr><td>" + reports.id + "</td><td>" + reports.type + "</td></td>" +
        reports.user + "</td><td>" + reports.status + "</td><td>" + reports.action + "</td></tr>");
  });
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

function populateAllWalks() {
  // manipulates DOM to show all walks in data

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