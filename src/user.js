class User {

    constructor(db) {
        this.users = db.collection('users');
    }

    async checkUsernameExists(username) {
        try {
            const user = await this.users.findOne({ username: username });

            return user !== null;
        } catch (error) {
            console.error('Error checking username existence:', error);
            return false;
        }
    }

    async createUser(age, first_name, last_name, username) {

        if(!checkUsernameExists(username)) {
            const user = {
                "location": [],
                "interests": [],
                "age": age,
                "age_range": [18, 125],
                "location_enabled": false,
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "friends": []
            }

            try {
                const result = await this.users.insertOne(user);
                console.log('User created with ID:', result.insertedId);
                return result.insertedId;
            } catch(error) {
                console.error('Error creating user:', error);
            }
        }
        else {
            console.error("Username exists!");
            return null;
        }
    }

    /*
        Use findOne and filter by id. Return user.
    */
    async getUserById(id) {
        try {
            const user = await this.users.findOne({ _id: id });
            if (user) {
                return user; // Return the user document if found
            } else {
                console.log('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    /*
        Use findOne and filter by username. Return user.
    */
    async getUserByUsername(username) {
        try {
            const user = await this.users.findOne({ username: username });
            if (user) {
                return user; // Return the user document if found
            } else {
                console.log('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    /*
        Use findOne and filter by username. Update lat/long.
        Commit changes to Mongo. Return true/false based on
        success.
    */
    async updateLocation(username, latitude, longitude) {
        try {
            // Find the user using getUserByUsername
            const user = await this.getUserByUsername(username);
            if (!user) {
                console.log('User not found.');
                return false; // Return false if user doesn't exist
            }

            // Update the user's location
            const result = await this.users.updateOne(
                { username: username }, // Filter by username
                { $set: { location: [latitude, longitude] } } // Update lat/long
            );

            // Check if the update was successful
            if (result.modifiedCount > 0) {
                console.log('Location updated successfully.');
                return true;
            } else {
                console.log('Failed to update location.');
                return false;
            }
        } catch (error) {
            console.error('Error updating location:', error);
            return false;
        }
    }

    /*
        Use findOne and filter by username. Update age range
        array. Commit changes to Mongo. Return true/false based
        on success.
    */
    async updateAgeRange(username, low, high) {
        try {
            // Find the user using getUserByUsername
            const user = await this.getUserByUsername(username);
            if (!user) {
                console.log('User not found.');
                return false; // Return false if user doesn't exist
            }

            // Update the user's age range
            const result = await this.users.updateOne(
                { username: username }, // Filter by username
                { $set: { age_range: [low, high] } } // Update age range
            );

            // Check if the update was successful
            if (result.modifiedCount > 0) {
                console.log('Location updated successfully.');
                return true;
            } else {
                console.log('Failed to update location.');
                return false;
            }
        } catch (error) {
            console.error('Error updating age range:', error);
            return false;
        }
    }

    /*
        Use findOne and filter by username. Append interest
        to interests array. Commit changes to Mongo. Return
        true/false based on success.
    */
    async addInterest(username, interest) {
        try {
            // Find the user using getUserByUsername
            const user = await this.getUserByUsername(username);
            if (!user) {
                console.log('User not found.');
                return false; // Return false if user doesn't exist
            }

             // Add the interest to the interests array
            const result = await this.users.updateOne(
                { username: username }, // Filter by username
                { $addToSet: { interests: interest } } // Add interest to the interests array (avoids duplicates)
            );

            // Check if the update was successful
            if (result.modifiedCount > 0) {
                console.log('Interest added successfully.');
                return true;
            } else {
                console.log('Failed to add interest.');
                return false;
            }

        } catch(error) {
            console.error('Error updating interests:', error);
            return false
        }
    }

    /*
        Use findOne and filter by username. Loop through
        interests, and delete when interest is found (then
        break). Commit changes to Mongo. Return true/false
        based on success.
    */
    async removeInterest(username, interest) {
        try {
            // Find the user using getUserByUsername
            const user = await this.getUserByUsername(username);
            if (!user) {
                console.log('User not found.');
                return false; // Return false if user doesn't exist
            }

             // Remove the interest to the interests array
            const result = await this.users.updateOne(
                { username: username }, // Filter by username
                { $pull: { interests: interest } } // Remove interest
            );

            // Check if the update was successful
            if (result.modifiedCount > 0) {
                console.log('Interest deleted successfully.');
                return true;
            } else {
                console.log('Failed to delete interest.');
                return false;
            }

        } catch(error) {
            console.error('Error deleting interests:', error);
            return false
        }
    }

    /*
        Use findOne and filter by username. Append friend
        to friends array. Commit changes to Mongo. Return
        true/false based on success.
    */
    async addFriend(username, friend_username) {
        try {
            // Find the user using getUserByUsername
            const user = await this.getUserByUsername(username);
            if (!user) {
                console.log('User not found.');
                return false; // Return false if user doesn't exist
            }

             // Add the interest to the interests array
            const result = await this.users.updateOne(
                { username: username }, // Filter by username
                { $addToSet: { friends: friend_username } } // Add interest to the interests array (avoids duplicates)
            );

            // Check if the update was successful
            if (result.modifiedCount > 0) {
                console.log('Friend added successfully.');
                return true;
            } else {
                console.log('Failed to add friend.');
                return false;
            }

        } catch(error) {
            console.error('Error updating friends:', error);
            return false
        }
    }

    /*
        Use findOne and filter by username. Loop through
        friends, and delete friend when found (then break).
        Commit changes to Mongo. Return true/false based
        on success.
    */
    async removeFriend(username, friend_username) {
        try {
            // Find the user using getUserByUsername
            const user = await this.getUserByUsername(username);
            if (!user) {
                console.log('User not found.');
                return false; // Return false if user doesn't exist
            }

             // Remove the interest to the interests array
            const result = await this.users.updateOne(
                { username: username }, // Filter by username
                { $pull: { friends: friend_username } } // Remove interest
            );

            // Check if the update was successful
            if (result.modifiedCount > 0) {
                console.log('Friend deleted successfully.');
                return true;
            } else {
                console.log('Failed to delete friend.');
                return false;
            }

        } catch(error) {
            console.error('Error deleting friends:', error);
            return false
        }
    }
}