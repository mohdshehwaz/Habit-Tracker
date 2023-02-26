const express = require('express');
const router = express.Router();

const habitController = require('../controllers/habit_controller');
router.post('/add',habitController.add);
router.get('/delete/:id',habitController.delete);
router.get('/details/:id',habitController.details);
router.get('/:id/:date_id/update',habitController.update);

module.exports = router;
