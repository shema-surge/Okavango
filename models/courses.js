const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    field:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'field'
    }
})