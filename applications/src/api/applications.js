const express = require("express");
const { verifySeeker, verifyEmployer } = require("../utils/auth");
const {
  applyJob,
  getUserApplication,
  getJobApplications,
  updateApplication,
  getEmpAppDetails,
  getEmpApplications,
  getApplication,
  postInterView,
  getEmpInterviews,
  getEmpInterviewDetails,
  getCandidateInterviews,
  updateInterviewDetails,
} = require("../services/applicationService");

const router = express.Router();

router.post("/apply", verifySeeker, applyJob);
router.get("/userApplications", verifySeeker, getUserApplication);
router.get("/emp-app-details", verifyEmployer, getEmpAppDetails);
router.get("/jobapplications/:id/:status", verifyEmployer, getJobApplications);
router.put("/update-status", verifyEmployer, updateApplication);
router.get("/emp-applications", verifyEmployer, getEmpApplications);
router.get("/emp-getApplication/:id", verifyEmployer, getApplication);
router.post("/interview", verifyEmployer, postInterView);
router.get("/emp-interviews/:id", verifyEmployer, getEmpInterviews);
router.get("/emp-interviewDetails/:id", verifyEmployer, getEmpInterviewDetails);
router.get("/interviews", verifySeeker, getCandidateInterviews);
router.put("/interview/:id", verifyEmployer, updateInterviewDetails);

module.exports = router;
