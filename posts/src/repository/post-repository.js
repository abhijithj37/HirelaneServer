const { jobPosts } = require("../database/models/posts");

module.exports = {
  getEmployerJobs: async (empId) => {
    const jobs = await jobPosts.find({ employerId: empId }).sort({ _id: -1 });
    return jobs;
  },
  deletePostById: async (jobId, empId) => {
    await jobPosts.deleteOne({ _id: jobId });
    const jobs = await jobPosts.find({ employerId: empId }).sort({ _id: -1 });
    console.log(jobs, "repository updated jobs");
    return jobs;
  },

  updateJobPost: async (id, data) => {
    const updatedJob = await jobPosts.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          jobTitle: data.jobTitle,
          jobLocation: data.jobLocation,
          workPlaceType: data.workPlaceType,
          jobType: data.jobType,
          noOfOpenings: data.noOfOpenings,
          description: data.description,
          screeningQuestions: data.screeningQuestions,
          experience: data.experience,
          salaryFrom: data.salaryFrom,
          salaryTo: data.salaryTo,
        },
      },
      { new: true }
    );
    return updatedJob;
  },
};
