const mongoose=require('mongoose')
const db = require('../connection')
const messageSchema= new mongoose.Schema({
      
  conversationId:String,
  message:String,
  from:String,
  read:{
    type:Boolean,
    default:false
  }
},
 
{timestamps:true})
module.exports={
Messages:db.model('message',messageSchema)
}