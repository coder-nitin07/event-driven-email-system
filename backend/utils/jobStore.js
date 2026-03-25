const jobs = [];

const addJob = (job) =>{
    jobs.push(job);
};

const updateJob = (id, updates) =>{
    const job = jobs.find(j => j.id === id);
    if(job){
        Object.assign(job, updates);
    }
};

const getJobs = () => jobs;

module.exports = { addJob, updateJob, getJobs };