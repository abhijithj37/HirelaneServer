const express=require('express')
const router=express.Router()
const {verifySeeker, verifyEmployer}=require('../utils/auth');
const {login,signUp,googleSignIn,signOut,verifyUser, updateProfile, getImage, getDetails, verifyEmail, sendVerificationEmail } = require('../services/seekerServices');
const {storage}=require('../storage/multer')
const multer=require('multer')
const path=require('path')
const upload=multer({storage:storage}).single("image")



router.post("/login",login);
router.post("/signup",signUp);
router.post('/googleSignIn',googleSignIn)
router.post('/verify-email',sendVerificationEmail)
router.get("/verifyUser",verifySeeker,verifyUser);
router.post("/logout",signOut);
router.put('/updateProfile',verifySeeker,upload,updateProfile)
router.get('/image/:file',getImage)
router.get('/details/:id',verifyEmployer,getDetails)
 




module.exports=router                                                               