const emailQueue = require("../../queues/email.queue");
const eventBus = require("../../utils/eventBus");
const EVENTS = require("../../utils/events");
const { addJob, getJobs } = require("../../utils/jobStore");

const sendEmail = async (req, res)=>{
    const { email } = req.body;

    if(!email || !email.includes('@')){
        return res.status(400).json({
            error: "Invalid email"
        });
    }

    // add job to the queue
    const job = await emailQueue.add('send-email-job', 
        {
            email,
        },
        {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 2000
            }
        },
    );

    eventBus.emit(EVENTS.EMAIL_QUEUED, {
            jobId: job.id,
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
const getAllJobs = async (req, res) => {
    const jobs = await emailQueue.getJobs([
        'waiting',
        'active',
        'completed',
        'failed'
    ]);

    const formatted = jobs.map(job => ({
        id: job.id,
        email: job.data.email,
        status: job.finishedOn
            ? 'completed'
            : job.failedReason
            ? 'failed'
            : job.processedOn
            ? 'processing'
            : 'queued'
    }));

    return res.json(formatted);
};

module.exports = { sendEmail, getAllJobs };