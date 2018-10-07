const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Route = new Schema({
    city:{
        type:Schema.Types.ObjectId,
        ref:'cities'
    },
    stage:{
        type:Schema.Types.ObjectId,
        ref:'stages'
    },
    cost:{
        type:Number
    },
    createdOn:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('routes',Route);