const {
  findAdmin,
  findAdminById,
} = require("../database/repository/admin-repository");
const { generateToken } = require("../utils/auth");

module.exports = {
  login: (req, res) => {
    console.log(req.body, "data");
    const { userName, password }=req.body;
    findAdmin(userName, password)
      .then(async (admin) => {
        if (admin){
          const token = generateToken(admin._id);
          res.cookie("admin_auth_token", token, { httpOnly: true });
          res.status(200).json(admin);
        } else{
          res.status(400).send("Invalid login credentials");
        }
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  },

  getAdmin: (req, res) =>{
    const id = req.admin_id;
    findAdminById(id)
      .then((data) => {
        
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  },

  
};
