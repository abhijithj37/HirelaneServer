const express=require('express')
const { getEmployers, updateVerificationStatus, getDetails } = require('../services/employerService')
const   router=express.Router()


 router.get('/employers',getEmployers)
 router.put('/verify',updateVerificationStatus)
 router.get('/details/:id',getDetails)

module.exports=router