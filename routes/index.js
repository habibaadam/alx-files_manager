const express = require('express');
const appController = require('../controllers/AppController');

const router = express.Router();
router.get('/status', appController.getStatus); // definition of getStatus
router.get('/stats', appController.getStats); // defintion of getStats

module.exports = router;
