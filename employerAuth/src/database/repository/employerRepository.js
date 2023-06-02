const { employers } = require("../models/employer");
const bcrypt = require("bcrypt");

module.exports = {
  getEmployerByEmail: async (email) => {
    const employer = await employers.findOne({ email: email });
    return employer;
  },

  createNewEmployer: async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newEmployer = {
      name: data.name,
      companyName: data.companyName,
      companySize: data.companySize,
      phone: data.phone,
      email: data.email,
      password: hashedPassword,
    };
    const savedEmployer = await employers(newEmployer).save();

    return savedEmployer;
  },

  getEmployerById: async (id) => {
    const employer = await employers.findOne({ _id: id });
    return employer;
  },
  getCompanyDetails:async(id)=>{
    const data=await employers.findOne({_id:id}).select('_id companyName ')
    return data
  },
  findAllEmployers:async()=>{
  const data=await  employers.find()
  return data
  },
  updateUserStatus:async(id,status)=>{
   const updated=await employers.findOneAndUpdate({_id:id},{$set:{blocked:status}},{new:true})
   return updated
  }
};
