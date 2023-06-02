const {
  getEmployerByEmail,
  createNewEmployer,
  getEmployerById,
  getCompanyDetails,
  findAllEmployers,
  updateUserStatus,
} = require("../database/repository/employerRepository");
const { generateToken, generateServiceToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const jwt_decode = require("jwt-decode");
const sendVerificationCode = require("../utils/sendEmail");
const { EmailVerificationTokens } = require("../database/models/emailVerificationToken");
const { employers } = require("../database/models/employer");
const crypto=require('crypto')
const axios=require('axios')
const USER_SERVICE=process.env.USER_SERVICE
const token=generateServiceToken()

module.exports = {


  signUp: async (req, res) => {
    try {
      const {email,verificationCode}=req.body
      const verificationToken = await EmailVerificationTokens.findOne({email,verificationToken:verificationCode})
      if (!verificationToken) {
        return res.status(400).send("Invalid verification code");
      }
      const newEmployer = await createNewEmployer(req.body);
      const token = generateToken(newEmployer._id);
      res.cookie("employer_auth_token", token, { httpOnly: true });
      res.status(200).json({ user: newEmployer });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },



  login: async (req, res) => {
    try {
      const employer = await getEmployerByEmail(req.body.email);
      if (employer) {
        if(employer.blocked){
          return res.status(400).send('This account is blocked')
        }
        const result = await bcrypt.compare(
          req.body.password,
          employer.password
        );
        if (result) {
          const token = generateToken(employer._id);
          res.cookie("employer_auth_token", token, { httpOnly: true });
          return res.status(200).json({ user: employer });
        } else {
          return res.status(400).send("Invalid Password");
        }
      } else {
        return res.status(400).send("Invalid Login Details");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },



  googleSignIn: async (req, res) => {
    try {
      const token = req.body.token;
      const userData = await jwt_decode(token);
      const { email } = userData;
      const employer = await getEmployerByEmail(email);
      if (employer) {
        if(employer.blocked){
          return res.status(400).send('This account is blocked')
        }
        const token = generateToken(employer._id);
        res.cookie("employer_auth_token", token, { httpOnly: true });
        return res.status(200).json({ user: employer });
      } else {
        return res.status(400).send("Invalid login Details");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
  


  logout: (req, res) => {
    try {
      res.clearCookie("employer_auth_token");
      res.status(200).send("logged out successfully");
    } catch (error) {
      res.status(400).send(error);
    }
  },



  getEmployer: async (req, res) => {
    try {
      const employer = await getEmployerById(req.employerId);
      if (employer) {
        res.status(200).json({ user: employer });
      } else {
        res.status(401).send("User Not Found");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
  getDetails:(req,res)=>{
    getCompanyDetails(req.params.id).then((data)=>{
    return  res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).send('Internal Server Error')
    })

  },
  sendVerificationEmail:async(req,res)=>{
     try{
    const {email}=req.body
    const user=await employers.findOne({email})
    if(user){
     return res.status(400).send('Email already in use')
    }
    

    const verificationToken=crypto.randomInt(100000,999999).toString()
     await sendVerificationCode(email,verificationToken)
     await EmailVerificationTokens.deleteOne({email})
     await EmailVerificationTokens({email,verificationToken}).save()
    res.status(200).send('Verification code send to email')
    }catch(error){
     res.status(400).send('Internal server Error')
    }
    },


    getEmployers:(req,res)=>{
      findAllEmployers().then((data)=>{
      res.status(200).json(data)
      }).catch((err)=>{
      res.status(500).send(err.message)
      })
    },
    updateVerificationStatus:(req,res)=>{
       const {employerId,status}=req.body
      updateUserStatus(employerId,status).then((data)=>{
      return  res.status(200).json(data)
      }).catch((err)=>{
        res.status(500).send(err.message)
      })

    },

    getUserDetails:(req,res)=>{
     axios.get(`${USER_SERVICE}details/${req.params.id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
     }).then(({data})=>{
      return res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).send(err.message)
    })
    }



};
