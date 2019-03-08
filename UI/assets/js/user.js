
// Get the modal
window.onload = function () {
    const modal = document.getElementById('myModal');

    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
} 
// instantiate Epichttp library
const http = new EpicHTTP();

const baseUrl = 'http://localhost:5000/api/v1/';

// instantiate UI
const ui = new UI();
