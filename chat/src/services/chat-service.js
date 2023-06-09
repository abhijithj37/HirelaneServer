 const {
   createNewMessage, findMessages, findConversations, findUnreadMessages, updateMessage, createdNewNotification, findNotifications, deleteNotification, updateNotification
} = require("../database/repository/chat-repository");

module.exports = {


   postMessage:(req,res)=>{ 
     createNewMessage(req.body).then((savedMessage)=>{
       res.status(200).json(savedMessage)

    }).catch((err)=>{
      res.status(500).send('Internal Server Error')
    })
  },
  getMessage:(req,res)=>{
   findMessages(req.query.user1,req.query.user2).then((messages)=>{
  res.status(200).json(messages)
  }).catch((err)=>{
  res.status(500).send('Internal Server Error')
  })
  


  },
  getConversations:(req,res)=>{
     findConversations(req.params.id).then((data)=>{
       res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).send('Internal Server Error')
    })
  },

  getUnreadMessages:(req,res)=>{
    findUnreadMessages(req.params.id).then((data)=>{
      res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).send(err.message)
    })
  },

  updateMsg:(req,res)=>{
    const {messageId}=req.body
    updateMessage(messageId).then((data)=>{
      res.status(200).json(data)
      
    }).catch(()=>{
      res.status(500).send('Internal Server Error')
    })
     
  },

  postNotification:(req,res)=>{
  createdNewNotification(req.body).then((data)=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })
  
   
  },
  getNotifications:(req,res)=>{
     findNotifications(req.query.id).then((data)=>{
    res.status(200).json(data)
    }).catch((err)=>{
    res.status(500).send(err.message)
    })
    
  },
  deleteUserNotification:(req,res)=>{
   deleteNotification(req.params.id).then(({data})=>{
    return res.status(200).json(data)
   }).catch((err)=>{
    res.status(500).send(err.message)
   })
  },
  updateUserNotification:(req,res)=>{
    console.log('called here with id',req.body.id);
    updateNotification(req.body.id).then((data)=>{
      res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).send(err.message)
    })
  }
};
