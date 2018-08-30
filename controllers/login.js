const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/users');

const schema = {
    usernameOrEmail: Joi.string().required().min(5),
    password: Joi.string().required().min(6).regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/),
    remember: Joi.boolean().required()
}

router.post('/',(req,res)=>{
    
})



module.exports = router;