const emailQueue = require("../../queues/email.queue");

const sendEmail = async (req, res)=>{
    const { email } = req.body;

    if(!email || !email.includes('@')){
        return res.status(400).json({
            error: "Invalid email"
        });
    }

    // add job to the queue
    await emailQueue.add('send-email-job', {
        email
    });

    return res.status(200).json({
        message: 'Email job added to Queue'
    });
};

module.exports = { sendEmail };