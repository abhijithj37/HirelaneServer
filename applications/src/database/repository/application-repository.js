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
      {$match:{employerId:id+"",status:{$eq:"Applied"},verificationStatus:'Approved'}},
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
    const data=await applications.find({employerId:id,verificationStatus:'Approved'})
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
  const  data=await interviews.find({employerID:id})
  return data
  
  },
  findEmpInterviewDetails:async(id)=>{
    const data=await interviews.findOne({applicationId:id})
    
    return data
  },
  findCandidateInterviews:async(id)=>{
    const data=await interviews.find({candidateId:id})
    return data
  },
  updateInterviewData:async(id,status)=>{
  const newData=await interviews.findOneAndUpdate({_id:id},{$set:{status:status}},{new:true})
  return newData
  },
  findAllApplications:async()=>{
    const data=await applications.find()
    return data
  },
  updateVerificationStatus:async(id,status)=>{
  const updated=await  applications.findOneAndUpdate({_id:id},{$set:{verificationStatus:status}},{new:true})
  return updated
  },

  findApplicationsByMonth:async()=>{
  const appData =await applications.aggregate([
    {$group:{
    _id:{$month:'$createdAt'},
    count:{$sum:1}
    
  }},
{
  $sort:{
    _id:1
  }
}])
const data=appData.map((d)=>({
 month:new Date(0,d._id-1).toLocaleString('en',{month:'short'}),
 applications:d.count
}))
return data
  }

 
};
