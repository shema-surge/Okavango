const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    }
})

module.exports = mongoose.model('field',fieldSchema)