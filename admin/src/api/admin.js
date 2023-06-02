const express = require("express");
const {
  login,
  getAdmin,
  logout,
  getPosts,
  postDetails,
  postVerify,
  getApplications,
  applicationDetails,
  verifyApplication,
  getEmployers,
  verifyEmployer,
  verifyUser,
  getAllUsers,
  getMonthlyApplications,
  getMonthlyPosts,
} = require("../services/admin-service");
const { AdminAuth } = require("../utils/auth");
const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", AdminAuth, getAdmin);
router.get("/job-posts", AdminAuth, getPosts);
router.get("/post/:id", AdminAuth, postDetails);
router.put("/verify-post", AdminAuth, postVerify);
router.get("/get-applications", AdminAuth, getApplications);
router.get("/application-details/:id", AdminAuth, applicationDetails);
router.put("/verify-application", AdminAuth, verifyApplication);
router.get("/employers", AdminAuth, getEmployers);
router.get("/users", AdminAuth, getAllUsers);
router.put("/verify-employer", AdminAuth, verifyEmployer);
router.put("/verify-user", AdminAuth, verifyUser);
router.get("/monthly-applications", AdminAuth, getMonthlyApplications);
router.get("/monthly-posts", AdminAuth, getMonthlyPosts);

module.exports = router;
