const { MongoClient, ServerApiVersion } = require('mongodb');
const User = require('./user.js')

class Database {

    constructor(username, password) {
        const uri_prefix = "mongodb+srv://"
        const uri_suffix = "@cluster0.l9m35rn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        this.uri = uri_prefix+username+":"+password+uri_suffix;
    }

    async initUser() {
      const user = new User(await this.getCollection("users"));
      await user.init();
      return user;
    }

    async getClient() {
      const client = new MongoClient(this.uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      await client.connect();
      return client;
    }

    async getCollection(collection_name) {
      const client = await this.getClient();
      return client.db('meetcute').collection(collection_name);
    }

    async test() {
      const client = await this.getClient();

        try {
          // Connect the client to the server	(optional starting in v4.7)
          await client.connect();
          // Send a ping to confirm a successful connection
          await client.db("meetcute").command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
    }

}

module.exports = Database;