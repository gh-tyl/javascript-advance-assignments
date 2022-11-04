import userClass from "./userClass.js";
import cookieClass from './cookieClass.js';
const cookieObj = new cookieClass();
const userList = new Map();
const depList = new Map();
const poList = new Map();
let logedUser = null;
if (cookieObj.getCookie('email') != '') {
    document.querySelector('#uname').value = cookieObj.getCookie('email');
}
fetch('./data/user_info.json').then(
    (returnData) => {
        returnData.json().then(
            (jsonData) => {
                jsonData.forEach((userObj, idx) => {
                    userList.set(idx, userObj);
                    // check session storage if user is loged in
                    if (sessionStorage.getItem('logged') != null) {
                        if (sessionStorage.getItem('logged') == userObj.email) {
                            console.log('user is loged in');
                            logedUser = new userClass(userObj.firstName, userObj.lastName, userObj.email, userObj.telephone, userObj.address, userObj.dob, userObj.ed, userObj.departmentId, userObj.positionId);
                            logedUser.fillDepartment();
                            logedUser.fillPosition();
                            logedUser.tablePop();
                            document.querySelector("#details").style.display = "block";
                            document.querySelector("#loginDiv").style.display = "none";
                        }
                    } else {
                        console.log('user is not loged in');
                    }
                })
            }
        )
    },
    (reason) => console.log(reason)
);
const loginValid = (userObj, uname, pass) => {
    if (userObj.email == uname && userObj.password == pass) {
        return true;
    }
    return false;
}
// logout btn
const logout = () => {
    sessionStorage.removeItem('logged');
    // remove tbody
    document.querySelector('tbody').remove();
    // clear the form and table body
    document.querySelector('#details').style.display = 'none';
    document.querySelector('#loginDiv').style.display = 'block';
}
document.querySelector('#logout').addEventListener('click', logout);
document.querySelector("#login").addEventListener('click', () => {
    let uname = document.querySelector('#uname').value;
    let pass = document.querySelector('#pass').value;
    userList.forEach((userObj) => {
        if (loginValid(userObj, uname, pass)) {
            logedUser = new userClass(userObj.firstName, userObj.lastName, userObj.email, userObj.telephone, userObj.address, userObj.dob, userObj.ed, userObj.departmentId, userObj.positionId);
            if (document.querySelector("#remember").checked) {
                cookieObj.setCookie('email', userObj.email);
            }
            return false;
        }
    });
    if (logedUser != null) {
        // add user to session storage
        sessionStorage.setItem('logged', logedUser.email);
        console.log(sessionStorage.getItem('logged'));
        logedUser.fillPosition();
        logedUser.fillDepartment();
        logedUser.tablePop();
        document.querySelector("#details").style.display = "block";
        document.querySelector("#loginDiv").style.display = "none";
    }
})
