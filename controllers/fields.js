const {BadRequest,NotFound} = require("http-errors")
const asyncHandler = require("../middleware/async")
const Fields = require("../models/fields")

const createField = asyncHandler(async(req,res)=>{
    const {name} = req.body
    if(!name) throw BadRequest("Please provide a name for the field")
    const newFields = await Fields.create(req.body)
    res.json({success:true,data:newFields})
})

const deleteField = asyncHandler(async(req,res)=>{
    const {fieldId} = req.params
    if(!fieldId) throw BadRequest("Please provide a fieldId")
    if(!await Fields.findById(fieldId)) throw NotFound("Could not find this Id")
    await Fields.findByIdAndDelete(fieldId)
    res.json({success:true})
})

const updateField = asyncHandler(async(req,res)=>{
    const {name} = req.body
    const {fieldId} = req.params
    if(!fieldId) throw BadRequest("Please provide a fieldId")
    if(!name) throw BadRequest("Please provide a name for the field")
    if(!await Fields.findById(fieldId)) throw NotFound("Could not find this Id")
    await Fields.findByIdAndUpdate(req.body)
    res.json({success:true})
})

const getFieldById = asyncHandler(async(req,res)=>{
    const {fieldId} = req.params
    if(!fieldId) throw BadRequest("Please provide a fieldId")
    const field = await Fields.findById(fieldId)
    if(!field) throw NotFound("Could not find this field")
    res.json({success:true,data:field})
})

const getFieldByName = asyncHandler(async(req,res)=>{
    const {name} = req.params
    if(!name) throw BadRequest("Please provide a field name")
    const field = await Fields.find({name:name})
    if(!field) throw NotFound("Could not find this field")
    res.json({success:true,data:field})
})

const getAllFields = asyncHandler(async(req,res)=>{
    const fields = await Fields.find()
    res.json({success:true,data:fields})
})

module.exports = {createField,deleteField,updateField,getAllFields,getFieldById,getFieldByName}

