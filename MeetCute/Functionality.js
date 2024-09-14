class User {
    constructor(Name, Age, InterestsArr, AgeRangeArr, LocationArr, LocationEnabled, idNum) {
        this.Name = Name;
        this.Age = Age;
        this.InterestsArr = InterestsArr;
        this.AgeRangeArr = AgeRangeArr;
        this.LocationArr = LocationArr;
        this.LocationEnabled = LocationEnabled;
        this.idNum = idNum
    }
}

let user1 = new User();
user1.InterestsArr = new Array();
user1.AgeRangeArr = new Array();
user1.LocationArr = new Array();

function updateUserInfo(){
    user1.Name = document.getElementById("nameInput");
    user1.Age = document.getElementById("ageInput");
    user1.InterestsArr = document.getElementById("interestsInput");
    user1.AgeRangeArr = document.getElementById("ageInput");
    user1.LocationEnabled = document.getElementById("locationEnabledInput");
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

function notYetImplemented(i, j){
    document.getElementById("result").innerHTML = "<h1>Sorry! This Feature is not yet implemented" +
    "<button style=\"bottom:11%; right:2%\" class=\"open-button\" onclick=\"getFoodInfo("+ i +"," + j
    +")\"><p>&#8592;</p></button></h1>";
}
/*YOUR PROFILE FUNCTIONS START*/