const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    tutorial:{
        type:String,
        required:true
    },
    text:{
        type:String,
        unique:true,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',
        required:true
    }
})

module.exports = mongoose.model('unit',unitSchema)
