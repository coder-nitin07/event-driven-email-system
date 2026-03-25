const { Worker } = require('bullmq');
const { updateJob } = require('../utils/jobStore');

// create worker
const emailWorker = new Worker(
    'email-queue',

    async (job) =>{
        console.log(`Processing Job: `, job.id);
        console.log(`Email:  `, job.data.email);

        if (Math.random() < 0.5) {
            console.log('Simulated failure');
            throw new Error('Email sending failed');
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));

        console.log("Email sent to: ", job.data.email);
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
    console.log(`Job ${job.id} failed (${job.attemptsMade} attempts)`);

    if (job.attemptsMade === job.opts.attempts) {
        updateJob(job.id, { status: 'failed' });
    }
});

emailWorker.on('active', (job) => {
  updateJob(job.id, { status: 'processing' });
  console.log(`🔄 Job ${job.id} | Attempt ${job.attemptsMade + 1}/${job.opts.attempts}`);
});