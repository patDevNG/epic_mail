window.onload = () => {
    // validate reg process
    regEmail.addEventListener('blur', validateregEmail);
    regfirstName.addEventListener('blur', validatefirstName);
    reglastName.addEventListener('blur', validatelastName);
    regphone.addEventListener('blur', validatePhone);
    regpassword.addEventListener('blur', validateregPassword);
    regcnfpassword.addEventListener('blur', validatecnfPassword);
}

// instantiate Epichttp library
const http = new EpicHTTP();

const baseUrl = 'http://localhost:5000/api/v1/';
// const baseUrl = 'https://jsonplaceholder.typicode.com/'

// instantiate UI
const ui = new UI();

// register variables
const regfirstName = document.getElementById('firstName');
const reglastName = document.getElementById('lastName');
const regphone = document.getElementById('phone');
const regEmail = document.getElementById('email');
const regcountry = document.getElementById('country');
const reggender = document.getElementById('gender');
const regpassword = document.getElementById('password');
const regcnfpassword = document.getElementById('cnfpassword');
const regdateOfBirth = document.getElementById('dateOfBirth');

// function to register a user
register = () => {
    //  add event listener for submit button on register
    document.getElementById('registerForm').addEventListener('submit', registerSubmit = (e) => {
        // get form values
        const email = regEmail.value;
        const firstName = regfirstName.value;
        const lastName = reglastName.value;
        const phoneNumber = regphone.value;
        const country = regcountry.value;
        const gender = reggender.value;
        const password = regpassword.value;
        const cnfpassword = regcnfpassword.value;
        const dateOfBirth = regdateOfBirth.value;

        // instantiate a new user
        const register = new Register(firstName, lastName, country, email, phoneNumber, gender, password, dateOfBirth);

        // validate the fields
        if (email === " " || firstName === " " || lastName === "" || phoneNumber === "" || country === "" || gender === "" || cnfpassword === "" || password === "") {
            // error alert
            ui.showAlert('Please fill in all fields', 'alert danger')
        } else {
            //  register user
            const registerUrl = "auth/signup";
            http.post(`${baseUrl}${registerUrl}`, register)
                .then(registeredUser => {

                    console.log(registeredUser);
                    if (registeredUser.status === 200) {
                        ui.showAlert('Registered Sucesfully', 'alert success');
                        console.log(registeredUser);
                    } else if (registeredUser.status === 'error') {
                        ui.showAlert('Email Exist', 'alert danger');
                    }
                })
                .catch(err => console.log(err));
            console.log('its working', register);
        }
        e.preventDefault();
    })
}

/*Validate Functions**/
// validate first name 
validatefirstName = () => {
    const re = /^[a-zA-Z]{2,50}$/
    if (!re.test(regfirstName.value)) {
        ui.showAlert('First Name must be more than two letters', 'alert danger');
        regfirstName.classList.add('border-red');
    }
    if (regfirstName.value == '') {
        ui.showAlert('This field is required', 'alert danger');
        regfirstName.classList.add('border-red');
    } else {
        regfirstName.classList.replace('border-red', 'border-green');
    }
}
// validate first name on register
validatelastName = () => {
    const re = /^[a-zA-Z]{2,50}$/
    if (!re.test(reglastName.value)) {
        ui.showAlert('Last Name must be more than two', 'alert danger');
        reglastName.classList.add('border-red');
    }
    if (reglastName.value == '') {
        ui.showAlert('This field is required', 'alert danger');
        reglastName.classList.add('border-red');
    } else {
        reglastName.classList.replace('border-red', 'border-green');
    }
} // function to validate phone on register
validatePhone = () => {
    const re = /^[0-9]{11}$/
    if (!re.test(regphone.value)) {
        ui.showAlert('Phone number must be between 11 numbers', 'alert danger');
        regphone.classList.add('border-red');
    } else if (regphone.value == '') {
        ui.showAlert('This field is required', 'alert danger');
        regphone.classList.add('border-red');
    } else {
        regphone.classList.replace('border-red', 'border-green');
    }
}
// function to validate password on register
validateregPassword = () => {
    if (regpassword.value === "") {
        ui.showAlert('This field is required', 'alert danger')
        regpassword.classList.add('border-red');
    } else {
        regpassword.classList.replace('border-red', 'border-green');
    }
}
// function to validate confirm password on register
validatecnfPassword = () => {
    if (regcnfpassword.value === "") {
        ui.showAlert('This field is required', 'alert danger')
        regcnfpassword.classList.add('border-red');
    }
    if (regcnfpassword.value !== password.value) {
        ui.showAlert('Password does not match', 'alert danger');
        regcnfpassword.classList.add('border-red');
    } else {
        regcnfpassword.classList.replace('border-red', 'border-green');
    }
}
// function to validate email on register
validateregEmail = () => {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)([a-zA-Z]{2,5})$/
    if (!re.test(regEmail.value)) {
        ui.showAlert('Use a valid email', 'alert danger');
        regEmail.classList.add('border-red');
    }
    if (regEmail.value == '') {
        ui.showAlert('This field is required', 'alert danger');
        regEmail.classList.add('border-red');

    } else {
        regEmail.classList.replace('border-red', 'border-green');
    }
}