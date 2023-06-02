const mongoose=require('mongoose')
const db = require('../connection')
const employerSchema = new mongoose.Schema({
      
    name:String,
    companyName:String,
    companySize:Number,
    phone:Number,
    email:String,
    password:String,
    userType:{
        type:String,
        default:'employer'
    },
    blocked:{
        type:Boolean,
        default:false   
    }
})
module.exports={
employers:db.model('employers',employerSchema)
}