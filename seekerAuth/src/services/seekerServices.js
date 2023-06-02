const { seekers} = require("../database/modal/seeker");
const bcrypt = require("bcrypt");
const { generateToken, generateServiceToken } = require("../utils/auth");
const jwt_decode = require("jwt-decode");
const { body, validationResult } = require("express-validator");
 const { updateSeekerProfile, getUserDetails, updateUserStatus, findAllUsers } = require("../database/repository/seeker-repository");
const path=require('path');
const crypto=require('crypto')
 const sendVerificationCode = require("../utils/sendEmail");
const { EmailVerificationTokens } = require("../database/modal/emailVerificationToken")
const axios=require('axios')
const EMPLOYER_SERVICE=process.env.EMPLOYER_SERVICE
const token=generateServiceToken()

module.exports = {
signUp: async (req, res) => {
     try {
    await body("fName")
        .notEmpty()
        .withMessage("First name is required")
        .isAlpha()
        .withMessage("First name should only contain alphabets")
        .run(req);
      await body("lName")
        .notEmpty()
        .withMessage("Last name is required")
        .isAlpha()
        .withMessage("Last name should contain only alphabets")
        .run(req);
      await body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password should contain at least 8 characters")
        .run(req);
      const errors = validationResult(req);
     
      if (!errors.isEmpty()) {
        const errorObject ={};
        errors.array().forEach((error) => {
          errorObject[error.param] = error.msg;
        });
        return res.status(422).json({ errors: errorObject });
      }

      const {email,verificationCode}=req.body;
    
      const verificationToken=await EmailVerificationTokens.findOne({email,verificationToken:verificationCode})
       if (!verificationToken) {
      return res.status(400).send("Invalid verification code");
      }
      
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newSeeker = new seekers({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: hashedPassword,
      });
                                                                   
      const savedUser = await newSeeker.save();
      const token = generateToken(savedUser._id);

      res.cookie("seeker_auth_token",token,{httpOnly:true});
      res.status(200).json({seeker:savedUser});
      }catch (error) {
       res.status(500).send("Internal Server Error");
      }
  },


  
  login:async(req, res) => {
    let { email, password } = req.body;
     try {
      await body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password should contain at least 8 characters")
        .run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorObject ={};
        errors.array().forEach((error)=>{
          errorObject[error.param]=error.msg;
        });
        return res.status(422).json({errors:errorObject});
      }
    
    seekers.findOne({email:email}).then((seeker) => {
      if (seeker) {
        if(seeker.blocked){
          return res.status(400).send('This account is blocked')
        }
     
        bcrypt.compare(password, seeker.password).then(async (result) => {
          if (result) {
            const token = generateToken(seeker._id);

            res.cookie("seeker_auth_token", token, { httpOnly: true });
            res.status(200).json({ user: seeker });
          } else {
            res.status(400).send("invalid password");
          }
        });
      } else {
        res.status(400).send("Invalid Login Details");
      }
    });
  } catch (error){
    res.status(500).send("Internal Server Error");
  }
  },




  verifyUser: (req, res) => {
    const id = req.seekerId;
       seekers
      .find({ _id: id })
      .then((seeker)=>{
         res.status(200).json({ user: seeker });
      })
      .catch((error) =>{
        res.status(401).send("User Not Found");
      });
  },





  signOut: (req, res) => {
    try {
      res.clearCookie("seeker_auth_token");
      res.status(200).send("logout successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  },




  googleSignIn:async(req, res)=>{
    const token = req.body.token;
    const userData = await jwt_decode(token);
    const {given_name,family_name, email,email_verified}=userData;
    const googleUser={  
      fName:given_name,
      lName:family_name,
      email,
    };

    const seeker = await seekers.findOne({ email: email });
    if (seeker) {
      if(seeker.blocked){
        return res.status(400).send('This account is blocked')
      }
      const seeker_token = generateToken(seeker._id);
      res.cookie("seeker_auth_token", seeker_token, { httpOnly: true });
      return res.status(200).json({seeker});
    }
    if(email_verified) {
      seekers(googleUser)
        .save()
        .then((result) => {
          const auth_token = generateToken(result._id);
          res.cookie("seeker_auth_token", auth_token, { httpOnly: true });
          res.status(200).json({ seeker: result });
        });
    } else {
      res.status(400).send("email not verified");
    }
  },





updateProfile:async(req,res)=>{ 
const data=JSON.parse(req.body.data)
req.body.skills=data.skills
req.body.education=data.education
req.body.workExperience=data.workExperience
const seekerId=req.seekerId
let image=req.body.image
if(req.file){
  image=req.file.filename
}


 req.body.image=image  
 const updated=await updateSeekerProfile(req.body,seekerId)
 res.status(200).json({seeker:updated})
      
 },

  
  getImage:(req,res)=>{
      const fileName=req.params.file
      const imagePath=path.join(__dirname,"../uploads",fileName)
      res.sendFile(imagePath)
  },
  


  getDetails:(req,res)=>{
   getUserDetails(req.params.id).then((data)=>{
   return res.status(200).json(data)
  }).catch((err)=>{
  res.status(500).send('Internal Server Error')
  })
  },



sendVerificationEmail:async(req,res)=>{
try{
const {email}=req.body
const user=await seekers.findOne({email})
if(user){
 return res.status(400).send('Email already in use')
}

const verificationToken=crypto.randomInt(100000,999999).toString()
 await sendVerificationCode(email,verificationToken)
 await EmailVerificationTokens.deleteOne({email})
 await EmailVerificationTokens({email,verificationToken}).save()
res.status(200).send('Verification code send to email')
}catch(error){
 res.status(400).send(error)
}
},
getUsers:(req,res)=>{
  
  findAllUsers().then((data)=>{
  res.status(200).json(data)
  }).catch((err)=>{
  res.status(500).send(err.message)
  })
},
updateVerificationStatus:(req,res)=>{
   const {userId,status}=req.body
  updateUserStatus(userId,status).then((data)=>{
  return  res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })

},

getCompanyDetails:(req,res)=>{
axios.get(`${EMPLOYER_SERVICE}details/${req.params.id}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then(({data})=>{
   res.status(200).json(data)
}).catch((err)=>{
  res.status(500).send(err.message)
})
}

};
