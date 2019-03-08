ClassicEditor
.create( document.querySelector( '#editor1' ) )
.catch( error => {
    console.error( error );
} );
CKEDITOR.replace('editor1', {
    height: '80px'	
    });
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// services
class Service {
  // constructor(){
  //     this.baseUrl= 'https://jsonplaceholder.typicode.com/'
       
  // }
  async get(url) {
      // get all inbox messages
      const inboxes = await fetch (`${this.baseUrl}users`);
      const inboxMessages = await inboxes.json();

      // get all outbox messages
      const outboxes = await fetch (`${this.baseUrl}todos`);
      const outboxMessages = await outboxes.json();


      return {
          inboxMessages : inboxMessages,
          outboxMessages: outboxMessages
      }
  }
}