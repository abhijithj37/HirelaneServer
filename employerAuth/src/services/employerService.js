const {
  getEmployerByEmail,
  createNewEmployer,
  getEmployerById,
  getCompanyDetails,
} = require("../database/repository/employerRepository");
const { generateToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const jwt_decode = require("jwt-decode");

module.exports = {


  signUp: async (req, res) => {
    try {
      const employer = await getEmployerByEmail(req.body.email);
      if (employer) {
        return res.status(400).send("Email already exists");
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
      res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).send('Internal Server Error')
    })

  }


};
