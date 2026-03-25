const emailQueue = require("../../queues/email.queue");
const { addJob, getJobs } = require("../../utils/jobStore");

const sendEmail = async (req, res)=>{
    const { email } = req.body;

    if(!email || !email.includes('@')){
        return res.status(400).json({
            error: "Invalid email"
        });
    }

    // add job to the queue
    const job = await emailQueue.add('send-email-job', {
        email
    });

    // store job
    addJob({
        id: job.id,
        email,
        status: 'queued'
    });

    return res.status(200).json({
        message: 'Email job added to Queue',
        jobId: job.id
    });
};

// get api
const getAllJobs = (req, res)=>{
    return res.json(getJobs());
};

module.exports = { sendEmail, getAllJobs };