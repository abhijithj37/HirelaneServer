const express=require('express')
const { verifySeeker, verifyEmployer } = require('../utils/auth')
const { applyJob, getUserApplication, getEmployerApplications, getJobApplications } = require('../services/applicationService')
 
const   router=express.Router()


router.post('/apply',verifySeeker,applyJob)
router.get('/userApplications',verifySeeker,getUserApplication)
router.get('/employerApplications',verifyEmployer,getEmployerApplications)
router.get('/jobapplications/:id',verifyEmployer,getJobApplications)
  








module.exports=router 