const express = require("express");
const router = express.Router();
 const {

  getAllJobs, getJobById, updateStatus, getMonthlyPosts,
   
} = require("../services/postServices");
 
 router.get("/getJobs",getAllJobs);
 router.get('/post/:id',getJobById)
 router.put('/verify',updateStatus)
 router.get('/monthly-posts',getMonthlyPosts)
 

module.exports = router;
