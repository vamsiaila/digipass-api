const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Branch = new Schema({
    name:{
        type:String,
        required:true
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:'course'
    },
    createdOn:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('branch',Branch);
