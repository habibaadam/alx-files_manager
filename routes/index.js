const express = require('express');
const appController = require('../controllers/AppController');
const { postNew } = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController')
const UsersController = require('../controllers/UsersController')

const router = express.Router();
router.get('/status', appController.getStatus); // definition of getStatus
router.get('/stats', appController.getStats); // definition of getStatus
router.post('/users', postNew); // definition of postNew
router.get('/connect', AuthController.getConnect);//defination of getConnect
router.get('/disconnect', AuthController.getDisconnect);//defination of getDisconnect
router.get('/users/me', UsersController.getMe);

module.exports = router;
