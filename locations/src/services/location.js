const express=require('express')
const router=express.Router()
const {locations} =require('../database/model/index')

router.get('/locations',async(req,res)=>{
    const {input}=req.query
     try {
        const cities=await locations.find({city:{$regex:new RegExp(`^${input}`),$options:'i'}}).limit(10)
        res.json(cities)
    } catch (error) {
    console.error(error)
    res.status(500).json({message:'Internal server error'})
    }
    
})


module.exports=router