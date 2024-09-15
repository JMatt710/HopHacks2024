async function createUser(age, first_name, last_name, username, password) {
    const url = `http://localhost:3000/api/user/create?age=${age}&first_name=${first_name}&last_name=${last_name}&username=${username}&password=${password}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
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

async function updateLocation(username, latitude, longitude) {
    const url = `http://localhost:3000/api/user/update/location?username=${username}&latitude=${latitude}&longitude=${longitude}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function updateAgeRange(username, low, high) {
    const url = `http://localhost:3000/api/user/update/ageRange?username=${username}&low=${low}&high=${high}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function updateDistRange(username, range) {
    const url = `http://localhost:3000/api/user/update/distRange?username=${username}&range=${range}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function addInterest(username, interest) {
    const url = `http://localhost:3000/api/user/add/interest?username=${username}&interest=${interest}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function removeInterest(username, interest) {
    const url = `http://localhost:3000/api/user/remove/interest?username=${username}&interest=${interest}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function addFriend(username, friend_username) {
    const url = `http://localhost:3000/api/user/add/friend?username=${username}&friend_username=${friend_username}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function removeFriend(username, friend_username) {
    const url = `http://localhost:3000/api/user/remove/friend?username=${username}&friend_username=${friend_username}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function rejectFriend(username, friend_username) {
    const url = `http://localhost:3000/api/user/add/reject/?username=${username}&friend_username=${friend_username}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function removeRejectedFriend(username, friend_username) {
    const url = `http://localhost:3000/api/user/remove/reject/?username=${username}&friend_username=${friend_username}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

async function findUsersInRange(username) {
    const url = `http://localhost:3000/api/user/findUsersInRange/?username=${username}`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then (data => {
            console.log(data)
        });
} 

users_in_area = findUsersInRange("johndoe")

for (let i = 0; i < length(users_in_area); i++){
    potential_friend = users_in_area[i];
    /* Add pop up stuff here */
}


// Call the function with sample parameters
<<<<<<< HEAD
/*createUser(25, 'John', 'Doe', 'johndoe');
updateLocation("johndoe", 38.2, 20.4)
updateAgeRange("johndoe", 50, 89)
updateDistRange("johndoe", 500)
addInterest("johndoe", "Anime kawaii")
removeInterest("johndoe", "Anime kawaii")
addFriend("johndoe", "CringeyNithin")
removeFriend("johndoe", "CringeyNithin")
rejectFriend("johndoe", "Nithin")
removeRejectedFriend("johndoe", "Nithin")
findUsersInRange("johndoe")
getUserData("johndoe")*/
=======
//createUser(25, 'John', 'Doe', 'johndoe');
//updateLocation("johndoe", 38.2, 20.4)
//updateAgeRange("johndoe", 50, 89)
//updateDistRange("johndoe", 500)
//addInterest("johndoe", "Anime kawaii")
//removeInterest("johndoe", "Anime kawaii")
//addFriend("johndoe", "CringeyNithin")
//removeFriend("johndoe", "CringeyNithin")
//rejectFriend("johndoe", "Nithin")
//removeRejectedFriend("johndoe", "Nithin")
//findUsersInRange("johndoe")
getUserData("meetcute")
>>>>>>> Justin
