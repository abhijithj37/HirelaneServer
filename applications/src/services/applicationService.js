 const {
  createApplication,
  findUserApplications,
  findEmployerApplications,
  findJobApplications,
} = require("../database/repository/application-repository");

module.exports = {


  applyJob: (req, res) => {
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
        console.log(data, "data from the database");
        res.status(200).json({ applications: data });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },



  getEmployerApplications: (req, res) => {
    findEmployerApplications(req.employerId)
      .then((applications) => {
       res.status(200).json({ applications });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },



  getJobApplications: (req, res) => {

    const id = req.params.id;
    findJobApplications(id).then((applications) => {
        console.log(applications,'job applications');
       res.status(200).json({ applications });
    }).catch((err)=>{
       res.status(500).send(err.message)
    })
  },
};
