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

  async nbFiles() {
    // returns the number of all files in the database;
    const database = this.client.db(this.database);
    const collection = database.collection('files');
    const allFiles = await collection.find({}).toArray();
    return allFiles.length;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
