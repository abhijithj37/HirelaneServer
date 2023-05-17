const express=require('express')
const { verifySeeker, verifyEmployer } = require('../utils/auth')
const { postMessage, getMessage, getConversations, getUnreadMessages, updateMsg } = require('../services/chat-service')
  
const   router=express.Router()


router.get('/emp-msg',verifyEmployer,getMessage)
router.get('/msg',verifySeeker,getMessage)

router.post('/emp-msg',verifyEmployer,postMessage)
router.post('/msg',verifySeeker,postMessage)

router.get('/emp-conversations/:id',verifyEmployer,getConversations)
router.get('/conversations/:id',verifySeeker,getConversations)
router.get('/emp-unreadMessages/:id',verifyEmployer,getUnreadMessages)
router.get('/unreadMessages/:id',verifySeeker,getUnreadMessages)

router.put('/emp-update-msg',verifyEmployer,updateMsg)
router.put('/update-msg',verifySeeker,updateMsg)


   








module.exports=router 