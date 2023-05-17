const {seekers}=require('../modal/seeker')


module.exports={

updateSeekerProfile:async(data,id)=>{
 const updatedProfile=await seekers.findOneAndUpdate({_id:id},{$set:{
    fName:data.fName,
    lName:data.lName,
    image:data.image,
    phoneNo:data.phoneNo,
    city:data.city,
    country:data.country,
    street:data.street,
    pinCode:data.pinCode,
    about:data.about,
    education:data.education,
    workExperience:data.workExperience,
    skills:data.skills,
    modified:true,
    cvUrl:data.cvUrl
}},{new:true})

return updatedProfile
},

getUserDetails:async(id)=>{
    const user =await seekers.findOne({_id:id}).select('_id fName lName image')
    console.log(user,'its the user ');
    return user
}


}