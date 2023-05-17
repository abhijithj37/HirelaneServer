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
    }
})
module.exports={
employers:db.model('employers',employerSchema)
}