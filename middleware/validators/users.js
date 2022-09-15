const Joi = require('joi')
const {BadRequest} = require('http-errors')
const asyncHandler = require('./async')

const validateCreateUser = asyncHandler( async (req, res, next) => {
    try{
        const createUserSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().required(),
            phone: Joi.string().required(),
            date: Joi.string().required(),
            role: Joi.string().valid('admin','user').required(),
        })
       await  createUserSchema.validateAsync(req.body)
       next()
    }catch(e){
        next(BadRequest(e.message))
    }
})


const validateUpdateUser = asyncHandler( async (req, res, next) => {
    try{
        const updateUserSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().required(),
            phone: Joi.string().required(),
            date: Joi.string().required(),
        })
       await  updateUserSchema.validateAsync(req.body)
       next()
    }catch(e){
        next(BadRequest(e.message))
    }
})

//===============================================================================================
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

module.exports = {
    validateCreateUser,
    validateUpdateUser,
    validateEmail
}