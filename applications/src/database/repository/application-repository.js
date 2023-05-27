const { applications, interviews } = require("../models/application");

module.exports = {
  createApplication: async (data) => {
    const newApplication = await applications(data).save();
    return newApplication;
  },

  findUserApplications: async (id) => {
    const data = await applications.find({ candidateId: id });
     return data;
  },
  
  findEmpAppDetails:async(id)=>{
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
  findJobApplications:async(id,status)=>{
   const data=await applications.find({jobId:id,status:status})
   return data
  },


    updateApplicationStatus:(data)=>{
    return new Promise((resolve,reject)=>{
      applications.updateOne({_id:data.applicationId},{$set:{status:data.status}}).then((result)=>{
      resolve(result)
      }).catch((err)=>{
      reject(err)
      })
    })
  },

   
  findAllempApplications:async(id)=>{
    const data=await applications.find({employerId:id})
    return data
  },
  findApplication:async(id)=>{
    const data=await applications.findOne({_id:id})
    return data
  },
  createNewInterView:async(details)=>{
    const data=await interviews(details).save()
    return data
  },
  findEmpInterviews:async(id)=>{
    const data=await interviews.find({employerID:id})
    return data
  },
  findEmpInterviewDetails:async(id)=>{
    const data=await interviews.findOne({applicationId:id})
    console.log(data,'emp interview details');
    return data
  }
};
