class User {

    constructor(collection) {
        this.users = collection;
    }

    async init() {
        await this.users.createIndex({ username: 1 });
        await this.users.createIndex({ location: "2dsphere"});
    }

    /* user will be null if it isn't found 
        return true if not null (found)
        return false if null (not found)
        */
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
        const usernameExists = await this.checkUsernameExists(username);
        if(!usernameExists) {
            const user = {
                "location": {
                    "type": "Point",
                    "coordinates": [0,0]
                },
                "interests": [],
                "age": age,
                "age_range": [18, 125],
                "dist_range": 2,
                "location_enabled": false,
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "friends": [],
                "rejected_friends": []
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
            // Update the user's location
            const result = await this.users.updateOne(
                { username: username }, // Filter by username
                { 
                    $set: { 
                            location: {
                                "type": "Point",
                                "coordinates": [longitude, latitude]
                            },
                            location_enabled: true
                        } 
                } // Update lat/long
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

    async updateDistRange(username, range) {
        try {
            // Update the user's distance range
            const result = await this.users.updateOne(
                { username: username }, // Filter by username
                { $set: { dist_range: range } } // Update distance range
            );

            // Check if the update was successful
            if (result.modifiedCount > 0) {
                console.log('Distance range updated successfully.');
                return true;
            } else {
                console.log('Failed to update distance range.');
                return false;
            }
        } catch (error) {
            console.error('Error updating distance range:', error);
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

    /*
        Use findOne and filter by username. Append friend
        to rejected_friends array. Commit changes to Mongo. Return
        true/false based on success.
    */
        async addRejectedFriend(username, friend_username) {
            try {
                 // Add the interest to the interests array
                const result = await this.users.updateOne(
                    { username: username }, // Filter by username
                    { $addToSet: { rejected_friends: friend_username } } // Add interest to the interests array (avoids duplicates)
                );
    
                // Check if the update was successful
                if (result.modifiedCount > 0) {
                    console.log('Friend rejected successfully.');
                    return true;
                } else {
                    console.log('Failed to reject friend.');
                    return false;
                }
    
            } catch(error) {
                console.error('Error updating rejected friends:', error);
                return false
            }
        }
    
        /*
            Use findOne and filter by username. Loop through
            rejected_friends, and delete friend when found (then break).
            Commit changes to Mongo. Return true/false based
            on success.
        */
        async removeRejectedFriend(username, friend_username) {
            try {
                 // Remove the interest to the interests array
                const result = await this.users.updateOne(
                    { username: username }, // Filter by username
                    { $pull: { rejected_friends: friend_username } } // Remove interest
                );
    
                // Check if the update was successful
                if (result.modifiedCount > 0) {
                    console.log('Friend deleted from rejects successfully.');
                    return true;
                } else {
                    console.log('Failed to delete friend from rejects.');
                    return false;
                }
    
            } catch(error) {
                console.error('Error unrejecting friends:', error);
                return false
            }
        }

    /* 
        Given a user, returns an array of usernames that have search
        radius' that overlap.
    */
    async findUsersInRange(username) {
        const currentUser = await this.getUserByUsername(username);
        const currentUserLocation = currentUser.location;
        const currentUserRange = currentUser.dist_range * 1609.34 // Miles to Meters Conversion

        const results = await this.users.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: currentUserLocation.coordinates
                    },
                    distanceField: "distance", // Store distance in meters
                    maxDistance: currentUserRange, // Max distance in meters
                    spherical: true // Use 2dsphere calculations
                }
            },
            {
                $match: {
                    range: { $gte: currentUser.distance / 1609.34 } // Convert the distance back to miles for comparison
                }
            }
        ]).toArray();

        return results;
    }
}

module.exports = User;