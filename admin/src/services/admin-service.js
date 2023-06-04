const {
  findAdmin,
  findAdminById,
} = require("../database/repository/admin-repository");
const { generateToken ,generateServiceToken} = require("../utils/auth");
const axios=require('axios')
const POST_SERVICE=process.env.POST_SERVICE
const APPLICATION_SERVICE=process.env.APPLICATION_SERVICE
const EMPLOYER_SERVICE=process.env.EMPLOYER_SERVICE
const USER_SERVICE=process.env.USER_SERVICE
const CHAT_SERVICE=process.env.CHAT_SERVICE
const token=generateServiceToken()


module.exports = {

  login: (req, res) => {
    const {userName,password }=req.body;
    findAdmin(userName,password)
      .then(async (admin)=>{
        if (admin){
          const token = generateToken(admin._id)
          res.cookie("admin_auth_token",token,{httpOnly:true})
          res.status(200).json(admin);
        } else{
          res.status(400).send("Invalid login credentials");
        }
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  },


  getAdmin:(req, res) =>{
    const id = req.admin_id;
    findAdminById(id)
      .then((data)=>{
      res.status(200).json(data);
      })
      .catch((err) => {
      res.status(500).json(err.message);
      });
  },


logout:(req,res)=>{
  try {
    res.clearCookie('admin_auth_token')
    res.status(200).send('logout successfully')
  } catch (error) {
    res.status(500).send(error.message)
  }
},

getPosts:(req,res)=>{
 axios.get(`${POST_SERVICE}getJobs`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
 }).then(({data})=>{
  
res.status(200).json(data.jobs)
}).catch((err)=>{
  res.status(500).send(err.message)
})

},
postDetails:(req,res)=>{
  
  axios.get(`${POST_SERVICE}post/${req.params.id}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data.job)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })

},
postVerify:(req,res)=>{ 
  const data=req.body
  axios.put(`${POST_SERVICE}verify`,data,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })
},
getApplications:(req,res)=>{
   axios.get(`${APPLICATION_SERVICE}applications`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })
},
applicationDetails:(req,res)=>{
   axios.get(`${APPLICATION_SERVICE}application/${req.params.id}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })

},
verifyApplication:(req,res)=>{
  const data=req.body
  axios.put(`${APPLICATION_SERVICE}verify`,data,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })

},
getEmployers:(req,res)=>{
  axios.get(`${EMPLOYER_SERVICE}employers`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })

},
verifyEmployer:(req,res)=>{
   axios.put(`${EMPLOYER_SERVICE}verify`,req.body,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })
},


getAllUsers:(req,res)=>{
   axios.get(`${USER_SERVICE}users`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })

},

verifyUser:(req,res)=>{

   axios.put(`${USER_SERVICE}verify`,req.body,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })
},
getMonthlyApplications:(req,res)=>{
   axios.get(`${APPLICATION_SERVICE}monthly-applications`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })
},
getMonthlyPosts:(req,res)=>{
  axios.get(`${POST_SERVICE}monthly-posts`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
   res.status(200).json(data)
 }).catch((err)=>{
   res.status(500).send(err.message)
 })
},


sendNotification:(req,res)=>{
  axios.post(`${CHAT_SERVICE}notification`,req.body,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then(({data})=>{
    res.status(200).json(data)
   }).catch((err)=>{
    res.status(500).send(err.message)
   })
}


};
