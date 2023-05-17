const express=require('express')
const { signUp, login, googleSignIn, logout,  getEmployer, getDetails } = require('../services/employerService')
const { validateSignup, validateLogin } = require('../utils/validations/validateCredentials')
const { validate } = require('../utils/validations/validation')
const { vefifyEmployer, verifySeeker } = require('../utils/auth')

const   router=express.Router()


router.post('/signup', validateSignup,validate,signUp)

router.post('/login',validateLogin,validate,login)

router.post('/googleSignIn',googleSignIn)

router.get('/verifyEmployer',vefifyEmployer,getEmployer)

router.get('/details/:id',verifySeeker,getDetails)

router.get('/logout',logout)


module.exports=router 