const { seekers} = require("../database/modal/seeker");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/auth");
const jwt_decode = require("jwt-decode");
const { body, validationResult } = require("express-validator");
const { validateLogin } = require("../../../employerAuth/src/utils/validations/validateCredentials");
const { updateSeekerProfile, getUserDetails } = require("../database/repository/seeker-repository");
const path=require('path');
const { log } = require("console");
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

      const { email } = req.body;
      const seeker = await seekers.findOne({ email });

      if (seeker) {
      return res.status(400).send("Email already exists");
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
    console.log(id,'thies is the id');
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




  googleSignIn: async (req, res) => {

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
      const seeker_token = generateToken(seeker._id);
      res.cookie("seeker_auth_token", seeker_token, { httpOnly: true });
      return res.status(200).json({seeker});
    }
    if(email_verified) {
      users(googleUser)
        .save()
        .then((result) => {
          const auth_token = generateToken(result._id);
          res.cookie("seeker_auth_token", auth_token, { httpOnly: true });
          res.status(200).json({ user: result });
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
    ('hello')
  getUserDetails(req.params.id).then((data)=>{
  log(data,'recived in the route')
  res.status(200).json(data)
  }).catch((err)=>{
  res.status(500).send('Internal Server Error')
  })
  }

};
