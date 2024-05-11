const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    this.con = `mongodb://${host}:${port}`;
    this.client = new MongoClient(this.con);
    this.client.connect();
  }

  isAlive() {
    // returns a boolean to check whether connection is successful
    return this.client.isConnected();
  }

  async nbUsers() {
    // returns the number of all users in the database
    const database = this.client.db(this.database);
    const collection = database.collection('users');
    const allUsers = await collection.find({}).toArray();
    return allUsers.length;
  }

  async createUser(email, hashedPw) {
    // inserst a new user into the database
    const database = this.client.db(this.database);
    const collection = database.collection('users');
    const newUser = await collection.insertOne({ email, password: hashedPw });
    return newUser;
  }

  async userExist(email) {
    // checks if a user with an email exists in the database
    const database = this.client.db(this.database);
    const collection = database.collection('users');
    const user = await collection.find({ email }).toArray();
    return user;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
