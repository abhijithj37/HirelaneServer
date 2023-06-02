 const { jobPosts } = require("../database/models/posts");
 const {locations}=require("../database/models/locations")
const {
  getEmployerJobs,
  deletePostById,
  updateJobPost,
  updatePostStatus,
  findPostsByMonth,
  findVerifiedJobs,
} =require("../database/repository/post-repository");

module.exports = {
  postJob: (req, res) => {
    const newPost = req.body;
     

    newPost.employerId = req.employerId;
  

    
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
       return res.status(200).json({ jobs });
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
    const {input}=req.query
    try {
   const cities=await locations.find({city:{$regex:new RegExp(`^${input}`),$options:'i'}}).limit(10)
    res.json(cities)
   }catch (error){
   res.status(500).json({message:'Internal server error'})
   }
  },
  updateStatus:(req,res)=>{
    const {postId,status}=req.body
    updatePostStatus(postId,status).then((updatedPost)=>{
   res.status(200).json(updatedPost)
    }).catch((err)=>{
    res.status(500).send(err.message)
    })
    
  },
  getMonthlyPosts:(req,res)=>{
  findPostsByMonth().then((data)=>{
  return  res.status(200).json(data)
  }).catch((err)=>{
  res.status(500).send(err.message)
  })
  },

  getVerifiedJobs:(req,res)=>{
    findVerifiedJobs().then((data)=>{
      res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).send(err.message)
    })
  }
};
