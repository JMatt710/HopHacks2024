
const { MongoClient, ServerApiVersion } = require('mongodb');

class Database {

    constructor(username, password) {
        this.uri = "mongodb+srv://"+username+":"+password+"@cluster0.l9m35rn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        this.client = new MongoClient(this.uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
        });
        this.db = this.client.db('meetcute');
    }

    async test() {
        try {
          // Connect the client to the server	(optional starting in v4.7)
          await this.client.connect();
          // Send a ping to confirm a successful connection
          await this.client.db("meetcute").command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
          // Ensures that the client will close when you finish/error
          await this.client.close();
        }
    }

    validateUser(user) {
        if (!user) {
            throw new Error('User object is required.');
        }

        // Check location: [float, float]
        if (!Array.isArray(user.location) || user.location.length !== 2 || 
            !user.location.every(coord => typeof coord === 'number')) {
            throw new Error('Invalid location: Expected an array of two floats.');
        }

        // Check interests: [str, ...]
        if (!Array.isArray(user.interests) || !user.interests.every(interest => typeof interest === 'string')) {
            throw new Error('Invalid interests: Expected an array of strings.');
        }

        // Check age: int
        if (typeof user.age !== 'number' || !Number.isInteger(user.age)) {
            throw new Error('Invalid age: Expected an integer.');
        }

        // Check age_range: [int, int]
        if (!Array.isArray(user.age_range) || user.age_range.length !== 2 || 
            !user.age_range.every(num => typeof num === 'number' && Number.isInteger(num))) {
            throw new Error('Invalid age_range: Expected an array of two integers.');
        }

        // Check location_enabled: bool
        if (typeof user.location_enabled !== 'boolean') {
            throw new Error('Invalid location_enabled: Expected a boolean.');
        }

        // Check first_name: str
        if (typeof user.first_name !== 'string') {
            throw new Error('Invalid first_name: Expected a string.');
        }

        // Check last_name: str
        if (typeof user.last_name !== 'string') {
            throw new Error('Invalid last_name: Expected a string.');
        }

        // Check username: str
        if (typeof user.username !== 'string') {
            throw new Error('Invalid username: Expected a string.');
        }
    }

    async checkUsernameExists(username) {
        try {
            const users = this.db.collection('users');
            const user = await users.findOne({ username: username });

            return user !== null;
        } catch (error) {
            console.error('Error checking username existence:', error);
            return false;
        }
    }

    async createUser(user) {
        try {
            this.validateUser(user);

            const users = this.db.collection('users');
            const result = await users.insertOne(user);
            console.log('User created with ID:', result.insertedId);
        } catch(error) {
            console.error('Error creating user:', error);
        }
    }

}

module.exports = Database;