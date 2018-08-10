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
    const data = Joi.validate(req.body,schema);
    if(!data.error){
        User.get({},(err,res)=>{
            if(res){
                const result = res.find(x=> x.username == data.value.usernameOrEmail || x.email == data.value.usernameOrEmail);
                if(result){
                    bcrypt.compare(data.value.password,result.password,(err,response)=>{
                        if(response){
                            const token = jwt.sign({_id:result._id,username:result.username},"private");
                            res.send({status:true,token:token,response:'successfully logged in'})
                        }else{
                            res.status(400).send({status:false,response:'wrong password'})
                        }
                    })
                }else{
                    res.status(404).send({status:false,response:'account not found'})
                }
            }else{
                res.status(400).send({status:false,response:'problem from retriving'})
            }
        })
    }else{
        res.status(400).send({status:false,response:data.error.details[0].message})
    }
})



module.exports = router;