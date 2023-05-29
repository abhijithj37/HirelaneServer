const express = require("express");
const router = express.Router();
const { verify } = require("../utils/auth");
const {
  postJob,
  getAllJobs,
  getJobById,
  getJobSuggessions,
  searchJobs,
  getJobsByEmployer,
  deletePost,
  updatePost,
  getLocations,
} = require("../services/postServices");
 
router.post("/postjob",verify,postJob);
router.get("/getJobs",getAllJobs);
router.get("/getJob/:id",getJobById);
router.get("/jobSuggessions",getJobSuggessions);
router.post("/searchJob",searchJobs);
router.get("/employerJobs",verify,getJobsByEmployer);
router.delete("/deletePost/:id",verify,deletePost);
router.put('/updatePost/:id',verify,updatePost)
router.get('/locations',getLocations)


module.exports = router;
