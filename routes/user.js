const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.get('/dashboard',passport.checkAuthentication,usersController.dashboard);
router.post('/create-user',usersController.create_user);
// use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession);

router.get('/sign-out', usersController.destroySession);


module.exports = router;

