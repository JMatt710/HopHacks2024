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

let user1 = new User();
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
    user1.Name = document.getElementById("nameInput");
    user1.Age = document.getElementById("ageInput");
    user1.InterestsArr = document.getElementById("interestsInput");
    user1.AgeRangeArr[0] = document.getElementById("ageRangeMinInput");
    user1.AgeRangeArr[1] = document.getElementById("ageRangeMaxInput");
    user1.LocationEnabled = document.getElementById("locationEnabledInput");
    user1.bioInput = document.getElementById("bioInput");
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
    "</div>" + "<table class = \"carttable\" >";
   
    let num = 0;
    for(let i in user1.InterestsArr){
        results = results + 
        "<tr class = \"cartitem\">" +
            "<td id = \"foodWidth" + i + "\" + style = \"width: 93%\">";
            results = results + "<h3 style = \"text-decoration: none\" id = \"itemLabel" + i + "\">" +  user1.InterestsArr[i] + "</h3>" +
            "</td>" +
            "<td style = \"width: 7%; text-align: center\" onclick = \"deleteItem(this.parentElement," + i + ")\">" +
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