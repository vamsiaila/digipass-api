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

 

module.exports = mongoose.model('users',userSchema);
