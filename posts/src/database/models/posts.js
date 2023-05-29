const mongoose=require('mongoose')
const db = require('../connection')
const jobPostSchema = new mongoose.Schema({
      jobTitle:String,
      companyName:String,
      jobType:String,
      jobLocation:String,
      workPlaceType:String,
      noOfOpenings:Number,
      description:String,
      employerId:String,
      salaryFrom:String,
      salaryTo:String,
      experience:String,
      screeningQuestions:[
      {
      question:String,
      responseType:String
      }
      ],
      createdAt:String,
      verified:{
            type:Boolean,
            default:false
      }
      
      
})

module.exports={
jobPosts:db.model('jobPosts',jobPostSchema)
}