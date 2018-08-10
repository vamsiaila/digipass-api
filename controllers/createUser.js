const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/users');
const auth = require('../middlewares/auth');

const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required().min(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.number().required().equal(10),
    password: Joi.string().required().regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/),
    admin: Joi.boolean().required()
}

router.post('/', auth, (req,res)=>{

})

module.exports = router;