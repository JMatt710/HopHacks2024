// Get the modals
var loginModal = document.getElementById('id01');
var registerModal = document.getElementById('id02');

// When the user clicks anywhere outside of the login modal, close it
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
}

// Handle Login form submission
document.querySelector('form[action="index.html"]').onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission
    
    var username = document.querySelector('input[name="uname"]').value;
    var password = document.querySelector('input[name="psw"]').value;
    
    validCredentials = getUserData(username);

   if (validCredentials && 'success' in validCredentials) {
        alert("Invalid Username or Password");
    } else {
        //Redirect to index.html
        window.location.href = "index.html";
    }
};

// Handle Register form submission
document.querySelector('form[action="register.html"]').onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission

    var firstName = document.querySelector('input[name="fname"]').value;
    var lastName = document.querySelector('input[name="lname"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var username = document.querySelector('input[name="uname"]').value;
    var password = document.querySelector('input[name="psw"]').value;

    if (firstName && lastName && email && username && password) {
        // Perform registration logic (this could involve saving to a database, API call, etc.)
        alert("Registration Successful!");
        // Redirect to a confirmation page or index.html
        window.location.href = "index.html";
    } else {
        alert("Please fill in all fields.");
    }
};












/*document.getElementById("loginForm").onsubmit = function(event) {
    //event.preventDefault(); // Prevent form submission

    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (email === "meetcute@gmail.com" && password === "meetcute") {
        window.location.replace("index.html"); // Redirect to the new page
    } else {
        alert("Invalid information"); // Show alert on invalid input
    }
};*/