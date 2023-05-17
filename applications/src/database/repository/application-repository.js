const { applications } = require("../models/application");

module.exports = {
  createApplication: async (data) => {
    const newApplication = await applications(data).save();
    return newApplication;
  },

  findUserApplications: async (id) => {
    const data = await applications.find({ candidateId: id });
    console.log(data,"data base data");
    return data;
  },
  
  findEmployerApplications:async(id)=>{
    const data = await applications.aggregate([
      {$match:{employerId:id+"",status:{$eq:"Applied"}}},
      { 
        $group: {
          _id:"$jobId",
          jobTitle:{$first:"$jobTitle"},
          location:{$first:"$jobLocation"},
          count:{$sum:1},
        },
      },
      {
        $project: {
          _id:1   ,
          jobTitle:1,
          count:1,
          location:1,
        },
      },
    ]);
    return data;
  },
  findJobApplications:async(id)=>{
    const data=await applications.find({jobId:id})
    return data
  }
};
