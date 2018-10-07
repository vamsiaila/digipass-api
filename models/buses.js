const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Buses = new Schema({
    busno:{
        type:String,
        required:true
    },
    route:{
        type:Schema.Types.ObjectId,
        ref:'routes'
    },
    createdOn:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('buses',Buses);