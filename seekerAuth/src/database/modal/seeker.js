const mongoose=require('mongoose')
const db = require('../../config/connection')
const seekerSchema = new mongoose.Schema({
     
    fName:String,
    lName:String,
    image:String,
    email:String,
    password:String,
    phoneNo:String,
    about:String,
    city:String,
    country:String,
    pinCode:String,
    street:String,
    education:[],
    workExperience:[],
    skills:[],
    modified:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    userType:{
        type:String,
        default:'job_seeker'
    },      
    cvUrl:{
        type:String,
        default:null
    },
    blocked:{
        type:Boolean,
        default:false
    }
})



module.exports={
seekers:db.model('seekers',seekerSchema)
}