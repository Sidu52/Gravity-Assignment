const express = require('express');
const router = express.Router();

const { register, login, dashboard } = require('../controllers/userController');

router.post('/register', register);
router.post('/signin', login);

module.exports = router;