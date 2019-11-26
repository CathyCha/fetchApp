/* AJAX fetch() calls */
const log = console.log
// log('Loaded front-end javascript.')\
// const bcrypt = require('bcryptjs')
function addUser(){

	const url = "/user";
	let data = {
		firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        password: document.querySelector('#password').value,
        userName: document.querySelector('#userName').value,
        homeAddress: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        province: document.querySelector('#province').value,
        phoneNumber: document.querySelector('#phoneNumber').value,
        emailAddress: document.querySelector('#emailAddress').value
	}
	const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    fetch(request)
    .then(function(res) {

    	// TODO: Nottify users that they their account is created

        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        // const message = document.querySelector('#message')
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            // console.log('Added student')
            // message.innerText = 'Success: Added a student.'
            // message.setAttribute("style", "color: green")
            alert("IT works !!")
            console.log("dsds")
           
        } else {
        //     // If server couldn't add the student, tell the user.
        //     // Here we are adding a generic message, but you could be more specific in your app.
        //     message.innerText = 'Could not add student'
        //     message.setAttribute("style", "color: red")
        console.log("Something went wrong")
     
        }
        // log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        console.log(error)
    })

}