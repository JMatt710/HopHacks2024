const { MongoClient, ServerApiVersion } = require('mongodb');
const User = require('./user.js')

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
        this.user = new User(this.db);
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

}

module.exports = Database;