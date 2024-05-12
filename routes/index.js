const express = require('express');
const appController = require('../controllers/AppController');
const { postNew, getMe } = require('../controllers/UsersController');
const { getConnect, getDisconnect } = require('../controllers/AuthController');
const {postUpload} = require('../controllers/FilesController')

const router = express.Router();
router.get('/status', appController.getStatus); // definition of getStatus
router.get('/stats', appController.getStats); // definition of getStatus
router.post('/users', postNew); // definition of postNew
router.get('/connect', getConnect); // defination of getConnect
router.get('/disconnect', getDisconnect); // defination of getDisconnect
router.get('/users/me', getMe);
router.post('/files', postUpload); //defination of postUpload


module.exports = router;
