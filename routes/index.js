const express = require('express');
const appController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

const router = express.Router();
router.get('/status', appController.getStatus); // definition of getStatus
router.get('/stats', appController.getStats); // defintion of getStatus
router.post('/users', UsersController.postNew); // definition of postNew
module.exports = router;
