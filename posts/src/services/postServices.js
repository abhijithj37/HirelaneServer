 const { jobPosts } = require("../database/models/posts");
 const {locations}=require("../database/models/locations")
const {
  getEmployerJobs,
  deletePostById,
  updateJobPost,
} =require("../repository/post-repository");

module.exports = {
  postJob: (req, res) => {
    const newPost = req.body;
    const date = new Date();
    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    newPost.employerId = req.employerId;
    newPost.createdAt = formattedDate;

    console.log(newPost, "its the new post");
    jobPosts(newPost)
      .save()
      .then(() => {
        res.status(200).send("Job Posted sucessfully");
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      });
  },



  getAllJobs: (req, res) => {
    jobPosts
      .find()
      .then((jobs) => {
        res.status(200).json({ jobs });
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      });
  },



  getJobById: (req, res) => {
    const id = req.params.id;
    jobPosts
      .findOne({ _id: id })
      .then((job) => {
        res.status(200).json({ job });
      })
      .catch(() => {
        res.status(500).send("Internal Server Error");
      });
  },

  getJobSuggessions: (req, res) => {
    const { input } = req.query;
    console.log("searching");
    jobPosts
      .find({ jobTitle: { $regex: input, $options: "i" } }, { jobTitle: 1 })
      .then((jobs) => {
        res.status(200).json({ jobs });
      })
      .catch((err) => {
        res.status(500).send("Internal server Error");
      });
  },


  searchJobs: (req, res) => {
    const { jobKeyWord, jobLocation } = req.body;
    let searchQuery = { jobTitle: { $regex: jobKeyWord, $options: "i" } };
    if (jobLocation) {
      searchQuery.jobLocation = jobLocation;
    }
    if (!jobKeyWord) {
      searchQuery = { jobLocation: jobLocation };
    }
    jobPosts
      .find(searchQuery)
      .then((jobs) => {
        res.status(200).json({ jobs });
      })
      .catch(() => {
        res.status(500).send("Internal server Error");
      });
  },




  getJobsByEmployer: async (req, res) => {
    try {
      const employerId = req.employerId;

      const jobs = await getEmployerJobs(employerId);

      return res.status(200).json({ jobs });
    } catch (error) {
      return res.status(500).send("Internal server Error");
    }
  },




  deletePost: async (req, res) => {
    try {
      const jobId = req.params.id;
      const empId = req.employerId;
      const updatedJobs = await deletePostById(jobId, empId);

      res.status(200).json({ jobs: updatedJobs });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },





  updatePost: async (req, res) => {
    try {
      const jobId = req.params.id;
      const data = req.body;
      const updatedPost = await updateJobPost(jobId, data);
      res.status(200).json({ job: updatedPost });
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  },


  getLocations:async(req,res)=>{
    console.log('calling????');
    const {input}=req.query
    try {
   const cities=await locations.find({city:{$regex:new RegExp(`^${input}`),$options:'i'}}).limit(10)
    res.json(cities)
   }catch (error){
   console.error(error)
   res.status(500).json({message:'Internal server error'})
   }
  }
};
