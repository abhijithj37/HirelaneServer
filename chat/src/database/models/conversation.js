const mongoose=require('mongoose')
const db = require('../connection')
const conversationSchema= new mongoose.Schema({
      
  chatUsers:{
    type:Array
  }

},
{timestamps:true})
module.exports={
Conversations:db.model('conversations',conversationSchema)
}