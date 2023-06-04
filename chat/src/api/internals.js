const express=require('express')
const { postNotification, getNotifications, deleteUserNotification, updateUserNotification } = require('../services/chat-service')
const router=express.Router()

router.post('/notification',postNotification)
router.get('/notifications',getNotifications)
router.delete('/notification/:id',deleteUserNotification)
router.put('/notification',updateUserNotification)




module.exports=router