const jwt =require('jsonwebtoken')
const serviceId=process.env.SERVICE_ID
 module.exports={
    generateToken:(employerId)=>{
        const token=jwt.sign({employerId},process.env.EMPLOYER_JWT_SECRET)
        return token
    },

    verifyEmployer: async (req, res, next) => {
        const token = await req.cookies.employer_auth_token;
        if (!token) {
            
        return res.status(401).send("Unauthorized: No token provided");
        }
        try {
          const decoded = jwt.verify(token,process.env.EMPLOYER_JWT_SECRET);
          req.employerId = decoded.employerId;
          next();
        } catch (err){
          res.status(401).send("Unauthorized: Invalid token");
    
        }
      },
      generateServiceToken:()=>{
        const token = jwt.sign({ serviceId }, process.env.SECRET);
        return token;
      },
      verifyService:async(req,res,next)=>{
        const token = await req.headers.authorization.split(' ')[1];
        
        if(!token) {
        
        return res.status(401).send("Unauthorized: No token provided");
        }

        try{
        const decoded=jwt.verify(token, process.env.SECRET);
        const id=decoded.serviceId
        
        next();
        }catch(err){
        
        res.status(401).send("Unauthorized:Invalid token");
        }
      }
      
      
 }