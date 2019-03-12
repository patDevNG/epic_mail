class UI {
    constructor() {

    }
    // show alert message
    showAlert(message, className) {
        // clear any remaining alerts
        this.clearAlert();
        const div = document.createElement('div');
        // add classes
        div.className = className;
        // add text
        div.appendChild(document.createTextNode(message));
        // append it to the dom 
        // get a parent
        const card = document.querySelector('.card');
        const cardBody = document.querySelector('.card-body');
        // insert alert
        card.insertBefore(div, cardBody);
        // timeout after 3 secs
        setTimeout(() => {
            this.clearAlert()
        }, 2000)
    }
    // clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }
}
