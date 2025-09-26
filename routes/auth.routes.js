// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

// Registro
router.post('/register', authCtrl.register);

// Login
router.post('/login', authCtrl.login);

module.exports = router;
