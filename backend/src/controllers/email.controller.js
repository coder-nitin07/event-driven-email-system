
const sendEmail = (req, res)=>{
    const { email } = req.body;

    if(!email || !email.includes('@')){
        return res.status(400).json({
            error: "Invalid email"
        });
    }

    return res.status(200).json({
        message: 'Email request received'
    });
};

module.exports = { sendEmail };