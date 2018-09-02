const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/users');

const schema = {
    usernameOrEmail: Joi.string().required().min(5),
    password: Joi.string().required().min(6).regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
}

router.post('/', async function (req,res){
    let result = Joi.validate(req.body,schema);
    if(!result.error){
        let user = await User.find({$or:[{username:result.value.usernameOrEmail},{email:result.value.usernameOrEmail}]});
        if(user.length){
           let match = await bcrypt.compare(result.value.password,user[0].password);
           if(match){
               const token = jwt.sign({id:user[0]._id,isAdmin:user[0].admin},'private');
               res.send({status:true,response:'logged in',access_token:token})
           }
           else
                res.status(400).send({status:false,response:'username or password wrong'})
        }
        else
            res.status(400).send({status:false,response:'username or password wrong'})
    }
    else
        res.status(400).send({status:false,response:result.error.details[0].message})
})

module.exports = router;