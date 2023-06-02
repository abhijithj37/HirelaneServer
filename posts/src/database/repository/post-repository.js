const { jobPosts } = require("../models/posts");

module.exports = {


  getEmployerJobs: async (empId) => {
    const jobs = await jobPosts.find({ employerId: empId }).sort({ _id: -1 });
    return jobs;
  },


  deletePostById: async (jobId, empId) => {
    await jobPosts.deleteOne({ _id: jobId });
    const jobs = await jobPosts.find({ employerId: empId }).sort({ _id: -1 });
    return jobs;
  },


  updateJobPost: async (id, data) => {
    const updatedJob = await jobPosts.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          jobTitle: data.jobTitle,
          jobLocation: data.jobLocation,
          workPlaceType: data.workPlaceType,
          jobType: data.jobType,
          noOfOpenings: data.noOfOpenings,
          description: data.description,
          screeningQuestions: data.screeningQuestions,
          experience: data.experience,
          salaryFrom: data.salaryFrom,
          salaryTo: data.salaryTo,
        },
      },
      { new: true }
    );
    return updatedJob;
  },


  updatePostStatus:async(id,status)=>{
  const updatedPost=await  jobPosts.findOneAndUpdate({_id:id},{$set:{status:status}},{new:true})
  return updatedPost
  },


  findPostsByMonth:async()=>{
    const postData=await jobPosts.aggregate([{
      $group:{
        _id:{
          $month:'$createdAt'
        },
        count:{$sum:1}
      }
    },
  {
    $sort:{
      _id:1
    }
  }])
      const data=postData.map((d)=>({
      month:new Date(0,d._id-1).toLocaleString('en',{month:'short'}),
      posts:d.count
    }))
    return data
  },
   findVerifiedJobs:async()=>{
   const data=await jobPosts.find({status:'Approved'})
  return data
   }


  
};
