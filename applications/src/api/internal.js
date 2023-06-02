const express = require("express");
const {
  getApplications,
  getApplication,
  updateVerificationStatus,
  getMonthlyApplications,
} = require("../services/applicationService");

const router = express.Router();

router.get("/applications", getApplications);
router.get("/application/:id", getApplication);
router.put("/verify", updateVerificationStatus);
router.get("/monthly-applications", getMonthlyApplications);

module.exports = router;
