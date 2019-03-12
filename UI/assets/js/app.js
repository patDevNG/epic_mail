// instantiate Epichttp library
const http = new EpicHTTP();

const baseUrl = 'http://localhost:5000/api/v1/';
// const baseUrl = 'https://jsonplaceholder.typicode.com/'

// instantiate UI
const ui = new UI();

// variables
// login variables
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

window.onload = () => {
    // validate login process
    loginEmail.addEventListener('blur', validateloginEmail);
    loginPassword.addEventListener('blur', validateloginPassword);
}


// // get all users
// http.get(`${baseUrl}users`)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// // get all todods
// http.get(`${baseUrl}todos/5`)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// const signUpUrl = "auth/signup"
//  post user
// http.post(`${baseUrl}posts`, regUser)
//     .then(regUser => console.log(regUser))
//     .catch(err => console.log(err));

//  update user
// http.put(`${baseUrl}users/5`, regUser)
//     .then(user => console.log(user))
//     .catch(err => console.log(err));


/*add event listener for submit button on login*/
login = () => {
    document.getElementById('loginForm').addEventListener('submit', submitForm = (e) => {

        // get form values
        const email = loginEmail.value;
        const password = loginPassword.value;
        // instantiate a new login
        const login = new Login(email, password);

        // validate the fields
        if (email === "" || password === "") {
            // error alert
            ui.showAlert('Please fill in all fields', 'alert danger')
        } else {
            //  post user login
            const loginUrl = "auth/login";
            http.post(`${baseUrl}${loginUrl}`, login)
                .then(loginUser => {
                    ui.showAlert('Login Successful', 'alert success');
                    console.log(loginUser);
                })
                .catch(err => console.log(err));
            console.log('its working, login user', login);
        }
        e.preventDefault();
    })
}

// function to validate the email before login
validateloginEmail = () => {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)([a-zA-Z]{2,5})$/
    if (!re.test(loginEmail.value)) {
        ui.showAlert('Use a valid email', 'alert danger');
        loginEmail.classList.add('border-red');
    }
    if (loginEmail.value == '') {
        ui.showAlert('This field is required', 'alert danger');
        loginEmail.classList.add('border-red');

    } else {
        loginEmail.classList.replace('border-red', 'border-green');
    }
}
// function to validate password on login
validateloginPassword = () => {
    if (loginPassword.value === "") {
        ui.showAlert('This field is required', 'alert danger')
        loginPassword.classList.add('border-red');
    } else {
        loginPassword.classList.replace('border-red', 'border-green');
    }
}