let userName = document.getElementById('name')
let userEmail = document.getElementById('email')
let userPass = document.getElementById('password')
let signUp = document.getElementById('registerBtn')
let userContainer = []

let warningMessage = document.getElementById('warning')
let successMessage = document.getElementById('succes')

if (localStorage.getItem('allUsers')) {
  userContainer = JSON.parse(localStorage.getItem('allUsers'))
}
const nameRegex = /^[a-zA-Z\s'-]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^.{5,}$/;
// /^[A-Za-z\d@$!%*?&]{5,}$/;

function validateName(nameReg) {
  return nameRegex.test(nameReg);
}

function validateEmail(emailReg) {
  return emailRegex.test(emailReg);
}

function validatePassword(passwordReg) {
  return passwordRegex.test(passwordReg);
}
if (document.getElementById('registrationForm') != null) {
  document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    let nameReg = userName.value;
    let emailReg = userEmail.value;
    let passwordReg = userPass.value;
    if (!validateName(nameReg)) {
      document.getElementById('nameError').textContent = "Invalid name.";
      isValid = false;
    } else {
      document.getElementById('nameError').textContent = "";
    }

    if (!validateEmail(emailReg)) {
      document.getElementById('emailError').textContent = "Invalid email.";
      isValid = false;
    } else {
      document.getElementById('emailError').textContent = "";
    }

    if (!validatePassword(passwordReg)) {
      document.getElementById('passwordError').textContent = "Password must be at least 8 characters long and include a combination of letters, numbers, and special characters.";
      isValid = false;
    } else {
      document.getElementById('passwordError').textContent = "";
    }

    if (isValid) {
      if (checkUser() == false) {
        addUser()
        successMessage.innerHTML = 'User has been successfulyy Registered';
        successMessage.classList.replace('d-none', 'd-block')
        warningMessage.classList.replace('d-block', 'd-none')
      }
      else{
        warningMessage.innerHTML = 'User already Registered';
        successMessage.classList.replace('d-block', 'd-none')
        warningMessage.classList.replace('d-none', 'd-block')
      }
    }
    else{
      warningMessage.classList.replace('d-block', 'd-none')
      successMessage.classList.replace('d-block', 'd-none')
    }
  });
}
// ---------------------------------

function addUser() {
  let userData = {
    user: userName.value,
    email: userEmail.value,
    pass: userPass.value
  }
  userContainer.push(userData)
  localStorage.setItem('allUsers', JSON.stringify(userContainer));
}


// -----------------------------
function checkUser() {
  for (let i = 0; i < userContainer.length; i++) {
    if (userContainer[i].email == userEmail.value) {
      warningMessage.innerHTML = 'E-mail Already Exist';
      warningMessage.classList.replace('d-none', 'd-block')
      successMessage.classList.replace('d-block', 'd-none')
      return true;
    }
  }
  return false;
}


// --------------Log in -----------------------

let LogEmail = document.getElementById('LogEmail');
let LogPass = document.getElementById('LogPass');

if (document.getElementById('signup') != null) {
  document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();
    Login()
  })
};


/////////login function to check userName and Password if they are saved in Local Storage Or not////
function Login()
{
  if (LogEmail.value != '' && LogPass.value != '') {
    for (let i = 0; i < userContainer.length; i++) {
      if (userContainer[i].email == LogEmail.value && userContainer[i].pass==LogPass.value) {
        warningMessage.classList.replace('d-block','d-none')
        localStorage.setItem('currentUser',JSON.stringify(userContainer[i].user))
        window.location.href = 'welcome.html'
        return
      }
    }
       warningMessage.innerHTML='Wrong Email Or Password'
       warningMessage.classList.replace('d-none','d-block')
  }
  else{
    warningMessage.innerHTML='Enter Your username and Password'
    warningMessage.classList.replace('d-none','d-block')
  }
}



///////////home page /////////////

if (document.getElementById('user') != null){
  let logged=document.querySelector('#userName')
  let currentUser=localStorage.getItem('currentUser')
  logged.innerHTML=`
  <h4>${currentUser}</h4>
  ` 
}
