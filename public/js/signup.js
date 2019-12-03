/* AJAX fetch() calls */
const log = console.log
// log('Loaded front-end javascript.')\
// const bcrypt = require('bcryptjs')
function addUser(){
    var usertype;
    if(document.getElementById("radio-one").checked){
        usertype = "/user"
    }else if(document.getElementById("radio-one").checked){
        usertype = "/walker"
    }


    // const url = "http://localhost:3001/user";
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
 
    const request = new Request(usertype, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include'
    });

    fetch(request)
    .then((res) => {
        log("lsoldolsodlsdosldosdlsdosldsodlsodsldosdlsodsldosdlsodsldosd")

        let newData = {
        password: document.querySelector('#password').value,
        username: document.querySelector('#username').value,
        userType: usertype,
        }
        log(newData)
        const url = "/login"
        request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: "include"
        });
        return fetch(request)
    }).catch((error)=>{
        log(error)
    })
        
}