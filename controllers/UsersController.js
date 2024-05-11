const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    const userExist = await dbClient.userExist(email);
    if (userExist) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }
    const hashedPassword = sha1(password); // Hash the password using SHA1
    const user = await dbClient.createUser(email, hashedPassword); // Store the hashed password in the database
    const id = `${user.insertedId}`;
    res.status(201).json({ id, email });
  }
}

module.exports = UsersController;
