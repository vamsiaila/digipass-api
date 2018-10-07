const express = require('express');
const router = express.Router();
const login = require('./login');
const route = require('./route.controller');
const buses = require('./buses.controller');
const students = require('./student.controller');

router.use('/api/login', login);
router.use('/api/routes', route);
router.use('/api/buses', buses);
router.use('/api/students', students);


module.exports = router;