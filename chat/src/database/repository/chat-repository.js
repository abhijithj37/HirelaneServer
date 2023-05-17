 const { Conversations } = require("../models/conversation");
const { Messages } = require("../models/message");

module.exports = {
  createNewMessage: async (data) => {
 
    try {
   let conversation=await Conversations.findOneAndUpdate({chatUsers:{$all:[data.from,data.to]}},{$set:{updatedAt:new Date()}},{new:true})
   if(!conversation){
     conversation=await new Conversations({chatUsers:[data.from,data.to]}).save()
   }

   const newMessage={
    conversationId:conversation._id,
    message:data.message,
    from:data.from
   }
   const savedMessage=await Messages(newMessage).save()
   return savedMessage


  } catch (error) {
      console.log(error)
  }
    
  },
  findMessages:async(user1,user2)=>{
  const conversation=await Conversations.findOne({chatUsers:{$all:[user1,user2]}})
  if(!conversation){
    return []
  }
  
  const messages=await Messages.find({conversationId:conversation._id})
  
  return messages
  },

  findConversations:async(id)=>{
  const conversations=await Conversations.find({chatUsers:{$in:[id]}}).sort({updatedAt:-1})
   return conversations
  },
  findUnreadMessages:async(id)=>{
    const messages= await Messages.find({conversationId:id,read:false})
    return messages
  },
  updateMessage:async(id)=>{
    const updatedMessage=await Messages.updateOne({_id:id},{$set:{read:true}},{new:true})
    console.log(updatedMessage,'the updated message')
    return updatedMessage
  }

};
