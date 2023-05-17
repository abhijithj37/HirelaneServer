 const jwt=require('jsonwebtoken')
 module.exports={
     

    verify: async (req, res, next) => {
        const token = await req.cookies.employer_auth_token;
        if (!token) {
            console.log('no emp token');
        return res.status(401).send("Unauthorized: No token provided");
        }
        try{
        const decoded=jwt.verify(token,process.env.EMPLOYER_JWT_SECRET);
        req.employerId=decoded.employerId;
        next();

        }catch (err){

          res.status(401).send("Unauthorized: Invalid token");
    
        }
      },
      
 }