class User {
    static FriendsArr;
    constructor(Name, Age, InterestsArr, AgeRangeArr, LocationArr, FriendsArr, LocationEnabled, UserName, bioInput) {
        this.Name = Name;
        this.Age = Age;
        this.InterestsArr = InterestsArr;
        this.AgeRangeArr = AgeRangeArr;
        this.FriendsArr = FriendsArr;
        this.LocationArr = LocationArr;
        this.LocationEnabled = LocationEnabled;
        this.UserName = UserName;
        this.bioInput = bioInput;
    }
}
async function getUserData(username) {
    const url = `http://localhost:3000/api/user/get?username=${username}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
}

function getCookie(name) {
    // Create a regular expression to find the cookie by name
    const value = `; ${document.cookie}`;
    console.log(value);
    const parts = value.split(`; ${name}=`);

    // If the cookie is found, return its value
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }

    // If the cookie is not found, return null
    return null;
}
let user1 = new User();
// (async () => {  
//     let username = getCookie('username');
//     let user_data = await getUserData(username);
//     console.log(user_data);
//     user1.Name = user_data.first_name + " " + user_data.last_name;
//     user1.Age = user_data.age;
//     user1.LocationEnabled = true;
//     user1.userName = user_data.username;
//     user1.bioInput = "I want to meet people!";
// })();

user1.Name = "Isabella";
user1.Age = 23;
user1.LocationEnabled = true;
user1.userName = "isabella_neel";
user1.bioInput = "I want to meet people!";

user1.FriendsArr = new Array();
user1.FriendsArr.push("Nithin");
user1.FriendsArr.push("Justin");
user1.FriendsArr.push("Ryan");

user1.InterestsArr = new Array(); 
user1.InterestsArr.push("Soccer");

user1.AgeRangeArr = new Array();
user1.AgeRangeArr.push(18);
user1.AgeRangeArr.push(122);

user1.LocationArr = new Array();
user1.LocationArr.push(6548);
user1.LocationArr.push(1538);

function updateUserInfo(){
    if(document.getElementById("nameInput").value != ""){user1.Name = document.getElementById("nameInput").value};
    if(document.getElementById("ageInput").value != ""){user1.Age = document.getElementById("ageInput").value};
    if(document.getElementById("ageRangeMinInput").value != ""){user1.AgeRangeArr[0] = document.getElementById("ageRangeMinInput").value};
    if(document.getElementById("ageRangeMaxInput").value != ""){user1.AgeRangeArr[1] = document.getElementById("ageRangeMaxInput").value};
    if(document.getElementById("bioInput").value != ""){user1.bioInput = document.getElementById("bioInput").value};
    displayProfile();
    flushInputsUserInfo()
}

function flushInputsUserInfo(){
    /* new function to clear all of the input fields on the form, in order to account for the new implementation of the form*/
    document.getElementById('nameInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('ageRangeMinInput').value = '';
    document.getElementById('ageRangeMaxInput').value = '';
    document.getElementById('bioInput').value = '';
}

function updateInterests(){
    user1.InterestsArr.push(document.getElementById("interest").value);
    displayProfile();
    flushInputsInterests();
}

function flushInputsInterests(){
    /* new function to clear all of the input fields on the form, in order to account for the new implementation of the form*/
    document.getElementById('interest').value = '';
}

/*MAP FUNCTIONS START*/
function toggleMessagingForm(){
    if (myFormMessaging.className === "form-popup-Messaging fpsshow"){
        myFormMessaging.className = "form-popup-Messaging";
        plus.className = "menuicon";
    } else {
        myFormMessaging.className = "form-popup-Messaging fpsshow";
        plus.className = "menuicon toggled";
    }
}

/*YOUR FRIENDS FUNCTIONS START*/
function toggleForm() { // opens/closes the form to enter food items to your Map page
    if (myForm.className === "form-popup fpshow"){
        myForm.className = "form-popup";
        plus.className = "menuicon";
    } else {
        myForm.className = "form-popup fpshow";
        plus.className = "menuicon toggled";
    } 
}

document.addEventListener("DOMContentLoaded", function() {
    // Function to open the form
    function openForm() {
        myForm.className = "form-popup fpsshow";
        console.log("Pop up should appear")
       // document.getElementById("popupMessage").textContent = "You got a match! :D"; // Update the popup message
        //document.getElementById("myForm").style.display = "block"; // Show the popup
    }

    // Function to close the form
    function closeForm() {
        document.getElementById("myForm").style.display = "none"; // Hide the popup
    }

    // Trigger the popup after 15 seconds (15,000 milliseconds)
    setTimeout(openForm, 15000);
});
function closePopUp(){
    myForm.className = "form-popup";
}
function toggleInterestForm(){
    if (myFormInterest.className === "form-popup-interest fpsshow"){
        myFormInterest.className = "form-popup-interest";
        plus.className = "menuicon";
    } else {
        myFormInterest.className = "form-popup-interest fpsshow";
        plus.className = "menuicon toggled";
    }
}

function displayAllFriendsListItems(){
    var results = "<table class = \"carttable\" >";
   
    let num = 0;
    for(let i in user1.FriendsArr){
        results = results + 
        "<tr class = \"cartitem\">" +
            "<td id = \"foodWidth" + i + "\" + style = \"width: 93%\">";
            results = results + "<h3 style = \"text-decoration: none\" id = \"itemLabel" + i + "\">" +  user1.FriendsArr[i] /*+ " "  + getProfilePic.(user1.FriendsArr[i])*/ + "</h3>" +
            "</td>" +
            "<td style = \"width: 7%; text-align: center\" onclick = \"deleteItem(this.parentElement," + i + ")\">" +
                "<h3>x</h3>" +
            "</td>" +
        "</tr>";
        
        num = num + 1;
    }
        results = results + "</table>";
    
    if (num == 0){
        results = "<div style = \"width: 91%; margin: auto\"><p style = \"font-size: 1.25rem\">You currently have no friends, go out there and meetcute! </p></div>" + results
    }
    document.getElementById("resultFriendsList").innerHTML = results;
}

function deleteItem(input, index){
    var element = input;
    element.remove();
    user1.FriendsArr.splice(index, 1);
    displayAllFriendsListItems();
}

function deleteInterest(input, index){
    var element = input;
    element.remove();
    user1.InterestsArr.splice(index, 1);
    displayProfile();
}

function displayProfile(){
   var results = "<div class=\"profile-item-grid\">" +
        "<div class=\"profile-item-grid-item\" style=\"text-align: center;\">" +
            "<img src=\"images/pfp.png\" alt=\" style=\"border-radius: 50%\">" +
        "</div>" +
        "<div class=\"profile-item-grid-item\">" +
            "<span style = \"font-style: italic\">" + user1.Name + " | "  + user1.Age + "</span>" +
        "</div>" +
        "<div class=\"profile-item-grid-item\">" +
            "<span style = \"font-style: italic\">" + user1.bioInput + "</span>" +
        "</div>" +
         "<div class=\"profile-item-grid-item\" style=\"padding-top: 25px; font-size: 2rem;\"> Interests </div>" +
    "</div>" + "<table class = \"carttable\" style=\"margin-bottom: 100px;\">";
   
    let num = 0;
    for(let i in user1.InterestsArr){
        results = results + 
        "<tr class = \"cartitem\">" +
            "<td id = \"foodWidth" + i + "\" + style = \"width: 93%\">";
            results = results + "<h3 style = \"text-decoration: none\" id = \"itemLabel" + i + "\">" +  user1.InterestsArr[i] + "</h3>" +
            "</td>" +
            "<td style = \"width: 7%; text-align: center\" onclick = \"deleteInterest(this.parentElement," + i + ")\">" +
                "<h3>x</h3>" +
            "</td>" +
        "</tr>";
        
        num = num + 1;
    }
        results = results + "</table>";

   document.getElementById("resultProfile").innerHTML = results;
}

function notYetImplemented(i, j){
    document.getElementById("result").innerHTML = "<h1>Sorry! This Feature is not yet implemented" +
    "<button style=\"bottom:11%; right:2%\" class=\"open-button\" onclick=\"getFoodInfo("+ i +"," + j
    +")\"><p>&#8592;</p></button></h1>";
}
/*YOUR PROFILE FUNCTIONS START*/