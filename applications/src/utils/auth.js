const jwt =require('jsonwebtoken')
 
 module.exports={
    
    verifyEmployer: async (req, res, next) => {
        const token = await req.cookies.employer_auth_token;
        if (!token) {
            console.log('no emp token');
        return res.status(401).send("Unauthorized: No token provided");
        }
        try {
          const decoded=jwt.verify(token,process.env.EMPLOYER_JWT_SECRET);
          req.employerId=decoded.employerId;
          next();
        } catch (err){
          res.status(401).send("Unauthorized: Invalid token");
    
        }
      },

      verifySeeker:async(req, res, next) => {
  
        const token = await req.cookies.seeker_auth_token;
        if(!token) {
          console.log('no token');
        return res.status(401).send("Unauthorized: No token provided");
        }
        try{
        const decoded=jwt.verify(token, process.env.SEEKER_JWT_SECRET);
        req.seekerId=decoded.seekerId;
        next();
        }catch(err){
        res.status(401).send("Unauthorized:Invalid token");
        }
      },
      
      
 }