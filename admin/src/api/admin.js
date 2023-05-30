const express=require('express')
const { login, getAdmin } = require('../services/admin-service')
const { AdminAuth } = require('../utils/auth')
 const router=express.Router()



router.post('/login',login)
router.get('/verify',AdminAuth,getAdmin)



 


module.exports=router