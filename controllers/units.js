const {BadRequest} = require('http-errors')
const Units = require('../models/units')

const createUnit = async(req,res,next) =>{
    try{
        const {name,tutorialUrl,text,course} = req.body
        if(!name || !tutorialUrl || !text || !course) throw new BadRequest('Please provide all info')
        const unit = {
            name:name,
            tutorial:tutorialUrl,
            text:text,
            course:course
        }
        const newUnit = await Units.create(unit)
        res.json({success:true,data:newUnit})
    }catch(err){
        next(err)
    }
}

const deleteUnit = async(req,res,next) =>{
    try{
        if(!req.params.id) throw BadRequest('No id provided')
        const deletedUnit = await Units.findByIdAndDelete(req.params.id)
        if(!deletedUnit) throw new Error(`No unit with id:${req.params.id} exists`)
        res.json({success:true})
    }catch(err){
        next(err)
    }
}

const updateUnit = async(req,res,next) =>{
    try{
        if(!req.params.id) throw BadRequest('No id provided')
        const updatedUnit = await Units.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updatedUnit) throw new Error(`No unit with id:${req.params.id} exists`)
        res.json({success:true,data:updatedUnit})
    }catch(err){
        next(err)
    }
}

const getUnitById = async(req,res,next) =>{
    try{
        if(!req.params.id) throw BadRequest('No id provided')
        const unit = await Units.findById(req.params.id)
        if(!unit) throw new Error(`No unit with id:${req.params.id} exists`)
        res.json({success:true,data:unit})
    }catch(err){
        next(err)
    }
}

const getAllUnits = async(req,res,next) =>{
    try{
        const units = await Units.find()
        res.json({success:true,data:units})
    }catch(err){
        next(err)
    }
}

module.exports = {createUnit,deleteUnit,updateUnit,getUnitById,getAllUnits}
