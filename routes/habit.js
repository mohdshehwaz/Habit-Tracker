const express = require('express');
const router = express.Router();

const habitController = require('../controllers/habit_controller');
router.post('/add',habitController.add);
 

module.exports = router;
