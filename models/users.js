const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    email:String,
    phoneNumber:Number,
    password:String,
    admin:Boolean
})

const User = mongoose.model('User',userSchema);

exports.create = async function (data,callback) {
   const user = new User(data);
   const result = await user.save();
   callback(null,result);
}

exports.get = async function(req,callback){
    User.find(req.match,req.fields,(err,res)=>{
        callback(err,res);
    })
}

exports.update = async function(req,callback){
    User.update(req,match,req.fields,(err,res)=>{
        callback(err,res);
    })
}

exports.delete = async function(req,callback){
    User.remove(req,(err,res)=>{
        callback(err,res);
    })
}