const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    dob:{
        type:Date
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt)
    this.password = hashedPassword
    next()
})

userSchema.methods.validatePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model('user',userSchema)
