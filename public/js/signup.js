/* AJAX fetch() calls */
const log = console.log
// log('Loaded front-end javascript.')\
// const bcrypt = require('bcryptjs')
function addUser(){
    // var usertype;
    // if(document.getElementById("radio-one").checked){
    //     usertype = "/user"
    // }else if(document.getElementById("radio-one").checked){
    //     usertype = "/walker"
    // }
    // console.log(document.getElementById("signupForm").elements["userswitch"].value)
    const userType = "/"+document.getElementById("signupForm").elements["userswitch"].value
    console.log(userType)
    let data = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        password: document.querySelector('#password').value,
        username: document.querySelector('#username').value,
        homeAddress: document.querySelector('#homeAddress').value,
        city: document.querySelector('#city').value,
        province: document.querySelector('#province').value,
        phoneNumber: document.querySelector('#phoneNumber').value,
        emailAddress: document.querySelector('#emailAddress').value
    }
    // console.log(userType)
    const request = new Request(userType, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    });
    fetch(request)
    .then(function(res){
        if(res.status === 200){
            location.replace("/login.html")
            alert("Account Created, Pleaser login in")
        }else{
            alert('Could not create account, Please try again')
        }
    }).catch((error)=>{
        log(error)
    })      
}
