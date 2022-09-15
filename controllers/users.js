const {BadRequest,Unauthorized} = require('http-errors')
const Users = require("../models/users")



const createUser = async (req,res,next) => {
    try{
        const {name,email,password} = req.body
        if(!name || !email || !password) throw new BadRequest('Please provide all info')

        const user = {
            name:name,
            email:email,
            password:password
        }
        const newUser = await Users.create(user)
        res.json({success:true,data:newUser})
    }catch(err){
        next(err)
    }
}


const login = async(req,res,next) =>{
    try{
        const {email,password} = req.body
        if(!email || !password) throw new BadRequest('Please provide all info')

        const user = await Users.findOne({email:email})
        if(!user) throw new Unauthorized('Authentication failed')
        if(!await user.validatePassword(password)) throw new Unauthorized('Authentication failed')

        let session = {
            id:user._id,
            role:user.role,
            email:user.email
        }

        req.session.user = session
        res.json({success:true})
    }catch(err){
        next(err)
    }
}

const logout = async(req,res,next)=>{
    try{
        req.session.destroy(()=>{
            res.json({success:true})
        })
    }catch(err){
        next(err)
    }
}

module.exports = {createUser,login,logout}