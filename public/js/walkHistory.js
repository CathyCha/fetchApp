"use strict";

// Initialize the page
window.addEventListener("load", initializePage);

function helperforWalker(url) {
  const name = [];
  fetch(url).then((res) => {
    if (res.status === 200) {
        return res.json();
    }
    else {
        console.log("Error " + res.status + ": Could not get user data");
        return Promise.reject(res.status);
    }
  }).then((walker) => {
    const fname = walker.firstName;
    const lname = walker.lastName;
    name.push(fname, lname);
    console.log(name)
    return name;

    // walkerName.innerText = fname + " " lname;
  }).catch((error) => {
    if (error === 404) {
        alert("Session expired! Please log in again");
        window.location.href = "login.html";
    }
    else {
        console.log("????");
    }
  });
}

function initializePage(e) {
  // first find the user
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
    const user = {"userId": json._id};
    const userQuery = '?query=' + user
    const walkUrl = '/walk/' + userQuery
    fetch(walkUrl).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      else {
        console.log("Error " + res.status + ": Could not get walk data");
        return Promise.reject(res.status);
      }
    }).then((walks) => {
      // got all walks for user, update the view
      $.each(walks, function (index, value) {
        const name = [];

        const doc = document.getElementById("main");
        const container = document.createElement("div");
        container.className = "container-fluid";
        doc.appendChild(container);

        const walkHistory = document.createElement("div");
        walkHistory.className = "col-md-12";
        walkHistory.id = "walkHistory";
        container.appendChild(walkHistory);

        // get walker name with id
        const walkUrl = '/walker/' + String(value.walkerId);
        // const name = setTimeout(helperforWalker(walkUrl), 500);

        fetch(walkUrl).then((res) => {
          if (res.status === 200) {
              return res.json();
          }
          else {
              console.log("Error " + res.status + ": Could not get user data");
              return Promise.reject(res.status);
          }
        }).then((walker) => {
          const fname = walker.firstName;
          const lname = walker.lastName;
          name.push(fname, lname);
          return name;
          // walkerName.innerText = fname + " " lname;
        }).catch((error) => {
          if (error === 404) {
              alert("Session expired! Please log in again");
              window.location.href = "login.html";
          }
          else {
              console.log("????");
          }
        });

        console.log(name)

        const walkerName = document.createElement("p");
        walkerName.id = "walkerName";
        walkerName.innerText = name[0] + " " + name[1];

        const walkDate = document.createElement("span");
        walkDate.id = "walkDate";
        walkDate.innerText = value.startTime;
        walkerName.appendChild(walkDate);
        walkHistory.appendChild(walkerName);

        const from = document.createElement("p");
        from.className = "from";
        const fromCircle = document.createElement("span");
        fromCircle.className = "fromcircle";
        from.innerText = value.locations;
        from.appendChild(fromCircle);
        walkHistory.appendChild(from);

        const row = document.createElement("div");
        row.className = "row justify-content-md-center";

        const rating = document.createElement("div");
        rating.className = "col-3";
        const ratingtxt = document.createElement("p");
        ratingtxt.id = "rating";
        ratingtxt.innerText = "Walk Rating";
        rating.appendChild(ratingtxt);
        const ratingtxt2 = document.createElement("p");
        ratingtxt2.innerText = value.walkerRating;
        rating.appendChild(ratingtxt2);
        row.appendChild(rating);

        const duration = document.createElement("div");
        duration.className = "col-3";
        const durationtxt = document.createElement("p");
        durationtxt.id = "dur"
        durationtxt.innerText = "Duration"
        duration.appendChild(durationtxt);
        const durationtxt2 = document.createElement("p");
        durationtxt2.innerText = value.duration;
        duration.appendChild(durationtxt2);
        row.appendChild(duration);

        const price = document.createElement("div");
        price.className = "col-3";
        const pricetxt = document.createElement("p");
        pricetxt.id = "price"
        pricetxt.innerText = "Walk Price"
        price.appendChild(pricetxt);
        const pricetxt2 = document.createElement("p");
        pricetxt2.innerText = value.price;
        price.appendChild(pricetxt2);
        row.appendChild(price);

        walkHistory.appendChild(row);
      });
      }).catch((error) => {
        if (error === 404) {
            alert("Session expired! Please log in again");
            window.location.href = "login.html";
        }
        else {
            console.log("????");
        }
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
