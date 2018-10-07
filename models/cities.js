const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cities = new Schema({
    name:{
        type:String,
        required:true
    },
    stages:[
        {
            type:Schema.Types.ObjectId,
            ref:'stages'
        }
    ],
    slug:String,
    createdOn:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('cities',Cities);