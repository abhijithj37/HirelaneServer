const mongoose=require('mongoose')
const db = require('../connection')
const adminSchema = new mongoose.Schema({
   userName:{
    type:String,
    
   },
   password:{
    type:String,
    required:true
   }
})
module.exports={
admin:db.model('admin',adminSchema)
} 