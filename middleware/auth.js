const {Unauthorized} = require('http-errors')

const checkAuth = async(req,res,next)=>{
    try{
        if(!req.session.user) throw new Unauthorized('Please login')
        next()
    }catch(err){
        next(err)
    }
}

const roleAuth = (...roles)=>{
 return async(req,res,next)=>{
    try{
        if(!req.session.user) throw new Unauthorized('Please login')
        if(!roles.includes(req.session.user.role)) throw new Unauthorized('Not authorized')
        next()
    }catch(err){
        next(err)
    }
}}

module.exports = {checkAuth,roleAuth}
