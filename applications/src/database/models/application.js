const mongoose=require('mongoose')
const db = require('../connection')
const applicationSchema = new mongoose.Schema({
      
     fName:String,
     lName:String,
     phone:String,
     email:String,
     createdAt:String,
     questions:[],
     jobId:String,
     jobTitle:String,
     image:String,
     jobPostDate:String,
     candidateId:String,
     employerId:String,
     jobLocation:String,
     companyName:String,
     status:{
        type:String,
        default:'Applied'
     },
     cvUrl:String,
     verified:{
        type:Boolean,
        default:false
    }
})



const interviewSchema=new mongoose.Schema({
    candidateId:String,
    candidateName:String,
    companyName:String,
    applicationId:String,
    employerID:String,
    date:String,
    startTime:String,
    endTime:String,
    location:String,
    jobTitle:String,
    interviewMode:String,
    status:{
    type:String,
    default:'Pending'
    }
     
})

module.exports={
   applications:db.model('applications',applicationSchema),
   interviews:db.model('interviews',interviewSchema)
}