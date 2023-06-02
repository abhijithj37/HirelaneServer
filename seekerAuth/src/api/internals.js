const express=require('express')
const { getUsers, updateVerificationStatus, getDetails } = require('../services/seekerServices')
  

const   router=express.Router()


 router.get('/users',getUsers)
 router.put('/verify',updateVerificationStatus)
 router.get('/details/:id',getDetails)


module.exports=router 