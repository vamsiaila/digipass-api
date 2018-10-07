const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    regNo:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    course:{
        type:String,
        requied:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number
    },
    email:{
        type:String
    },
    route:{
        type:Schema.Types.ObjectId,
        ref:'routes'
    },
    busNo:{
        type:Schema.Types.ObjectId,
        ref:'buses'
    },
    seatNo:{
        type:Number,

    },
    receiptNo:{
        type:String,
        unique:true,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    createdOn:{
        type:Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('student',Student);