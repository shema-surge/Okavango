const Joi = require('joi')
const {BadRequest} = require('http-errors')
const asyncHandler = require('./async')

const validateCreateCourse = asyncHandler( async (req, res, next) => {
    try{
        const createCourseSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            field: Joi.string().valid('stem','arts','humanities','social sciences','health sciences','skills').required(),
        })
       await  createCourseSchema.validateAsync(req.body)
       next()
    }catch(e){
        next(BadRequest(e.message))
    }
})


const validateUpdateCourse = asyncHandler( async (req, res, next) => {
    try{
        const updateCourseSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
        })
       await  updateCourseSchema.validateAsync(req.body)
       next()
    }catch(e){
        next(BadRequest(e.message))
    }
})

module.exports = {
    validateCreateCourse,
    validateUpdateCourse
}