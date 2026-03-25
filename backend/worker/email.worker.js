const { Worker } = require('bullmq');
const { updateJob } = require('../utils/jobStore');

// create worker
const emailWorker = new Worker(
    'email-queue',

    async (job) =>{
        try {
            console.log(`Processing Job: `, job.id);
            console.log(`Email:  `, job.data.email);
            
            // update status
            updateJob(job.id, { status: 'processing' });

            // email sending delay
            await new Promise((resolve) => setTimeout(resolve, 3000));

            console.log("Email sent to: ", job.data.email);
        } catch (err) {
            console.log("Job failed: ", err.message);
            throw err;
        }
    },

    {
        connection: {
            host: '127.0.0.1',
            port: 6379
        }
    }
);

// listen to events
emailWorker.on('completed', (job) =>{
    updateJob(job.id, { status: 'completed' });
    console.log(`Job ${ job.id } completed`);
});

emailWorker.on('failed', (job, err)=>{
    updateJob(job.id, { status: 'failed' });
    console.log(`Job ${ job.id } failed: ${ err.message }`);
});