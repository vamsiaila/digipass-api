const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stage = new Schema({
    name:{
        type:String,
        required:true
    },
    parent:{
        type:Schema.Types.ObjectId,
        ref:'cities'
    },
    createdOn:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('stages',Stage);