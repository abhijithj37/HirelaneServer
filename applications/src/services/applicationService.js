const {
  createApplication,
  findUserApplications,
  findJobApplications,
  updateApplicationStatus,
  findAllempApplications,
  findEmpAppDetails,
  findApplication,
  createNewInterView,
  findEmpInterviews,
  findEmpInterviewDetails,
  findCandidateInterviews,
  updateInterviewData,
  
} = require("../database/repository/application-repository");
const {applications}=require('../database/models/application')

module.exports = {
  applyJob:async (req, res) => {
    const {candidateId,jobId}=req.body
    const userApplication=await applications.findOne({candidateId,jobId})
    if(userApplication){
   return res.status(400).send("Already applied for this job")
    }
    


    const date = new Date();
    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    req.body.createdAt = formattedDate;

    createApplication(req.body)
      .then((data) => {
        res.status(200).send("Application submitted successfully");
      })
      .catch((err) => {
        res.status(500).send("Internal Server Error");
      });
  },


  getUserApplication: (req, res) => {
    findUserApplications(req.seekerId)
      .then((data) => {
        res.status(200).json({ applications: data });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },


  getEmpAppDetails: (req, res) => {
    findEmpAppDetails(req.employerId)
      .then((applications) => {
        res.status(200).json({ applications });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },


  getJobApplications: (req, res) => {
    const id = req.params.id;
    const status=req.params.status
    findJobApplications(id,status)
      .then((applications) => {
        res.status(200).json({ applications });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },


  updateApplication:(req, res) => {
    updateApplicationStatus(req.body)
      .then(async (result) => {
        let response = result;
        if (req.body.jobId) {
          response = await findJobApplications(req.body.jobId,'Applied');
          console.log(response,'its the response');
        }
        if (req.body.employerId) {
          response = await findAllempApplications(req.body.employerId);
        }
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).send("Internal Server Error");
      });
  },



  getEmpApplications: (req, res) => {
    findAllempApplications(req.employerId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send("Internal server error");
      });
  },



  getApplication:(req,res)=>{
 
    findApplication(req.params.id).then((data)=>{
      console.log(data,'single application');
      res.status(200).json(data)  
    }).catch(()=>{
      res.status(500).send('Internal server error')
    })

  },



  postInterView:(req,res)=>{
     createNewInterView(req.body).then((data)=>{
       res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  },




  getEmpInterviews:(req,res)=>{
    findEmpInterviews(req.params.id).then((data)=>{
      console.log(data,'employer interviews');
      res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).json(err)
    })
  },




  getEmpInterviewDetails:(req,res)=>{
    findEmpInterviewDetails(req.params.id).then((data)=>{
      res.status(200).json(data)
    }).catch((er)=>{
      res.status(500).send('Internal server error')
    })
  },
  getCandidateInterviews:(req,res)=>{
    findCandidateInterviews(req.seekerId).then((data)=>{
    return  res.status(200).json(data)
    }).catch((err)=>{
      console.log(err);
    })
  },
  updateInterviewDetails:(req,res)=>{
  const id=req.params.id
  const {status}=req.body
  updateInterviewData(id,status).then((data)=>{
    res.status(200).json(data)
  }).catch((err)=>{
    console.log(err)
  })
  }
    
  
  
};
