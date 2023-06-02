const jwt = require("jsonwebtoken");
const serviceId=process.env.SERVICE_ID
module.exports = {
    
  generateToken: (admin_id) => {
    const token = jwt.sign({ admin_id }, process.env.ADMIN_SECRET);
    return token;
  },

  AdminAuth: async (req, res, next) => {
  
    const token = await req.cookies.admin_auth_token;
    if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
    }
    try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET);
    req.admin_id = decoded.admin_id;
    next();
    }catch (err) {
    res.status(401).send("Unauthorized:Invalid token");
    }
  },

  generateServiceToken:()=>{
    const token = jwt.sign({ serviceId }, process.env.SECRET);
    return token;
  },


   
};
