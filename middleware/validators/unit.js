const Joi = require('joi')
const {BadRequest} = require('http-errors')
const asyncHandler = require('./async')

const validateCreateUnit = asyncHandler( async (req, res, next) => {
    try{
        const createUnitSchema = Joi.object({
            name: Joi.string().required(),
            tutorial: Joi.string().required(),
            text: Joi.string().required(),
        })
       await  createUnitSchema.validateAsync(req.body)
       next()
    }catch(e){
        next(BadRequest(e.message))
    }
})


const validateUpdateUnit = asyncHandler( async (req, res, next) => {
    try{
        const updateUnitSchema = Joi.object({
            name: Joi.string(),
            tutorial: Joi.string(),
            text: Joi.string(),
        })
       await  updateUnitSchema.validateAsync(req.body)
       next()
    }catch(e){
        next(BadRequest(e.message))
    }
})

module.exports = {
    validateCreateUnit,
    validateUpdateUnit
}