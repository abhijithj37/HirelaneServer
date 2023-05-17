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
})
module.exports={
applications:db.model('applications',applicationSchema)
}