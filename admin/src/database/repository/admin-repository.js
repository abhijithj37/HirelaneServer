
const {admin} =require('../model')


module.exports={

    findAdmin:async(userName,password)=>{
    const adminData=await admin.findOne({userName:userName,password})
     return adminData
    },
    findAdminById:async(id)=>{
   const data=await admin.findOne({_id:id})
   return data
    }

    


}