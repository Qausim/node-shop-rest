const express = require('express');
const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();


router.post('/signup', UserController.signUpUser);

router.post('/login', UserController.loginUser);

router.delete('/:id', checkAuth, UserController.deleteUser);

router.get('/', UserController.getUsers);


module.exports = router;