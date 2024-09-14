class User {
    static foodArr;
    constructor(userName, foodArr, MessagingArr, FriendsArr, idNum) {
        this.userName = userName;
        this.foodArr = foodArr;
        this.MessagingArr = MessagingArr;
        this.FriendsArr=FriendsArr;
        this.idNum = idNum
    }
}

let user1 = new User();
user1.userName = "You"
user1.MessagingArr = new Array();
user1.FriendsArr = new Array();


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