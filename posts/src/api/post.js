const express = require("express");
const router = express.Router();
const { verify } = require("../utils/auth");
const {
  postJob,
  getJobById,
  getJobSuggessions,
  searchJobs,
  getJobsByEmployer,
  deletePost,
  updatePost,
  getLocations,
  getVerifiedJobs,
} = require("../services/postServices");
 
router.post("/postjob",verify,postJob);
router.get("/getJob/:id",getJobById);
router.get("/jobSuggessions",getJobSuggessions);
router.post("/searchJob",searchJobs);
router.get("/employerJobs",verify,getJobsByEmployer);
router.delete("/deletePost/:id",verify,deletePost);
router.put('/updatePost/:id',verify,updatePost)
router.get('/locations',getLocations)
router.get('/verified-jobs',getVerifiedJobs)


module.exports = router;
