const express = require('express');
const appController = require('../controllers/AppController');
const { postNew } = require('../controllers/UsersController');

const router = express.Router();
router.get('/status', appController.getStatus); // definition of getStatus
router.get('/stats', appController.getStats); // definition of getStatus
router.post('/users', postNew); // definition of postNew

module.exports = router;
