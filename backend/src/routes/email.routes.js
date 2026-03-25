const express = require('express');
const { sendEmail, getAllJobs } = require('../controllers/email.controller');
const emailRouter = express.Router();

emailRouter.post('/send-email', sendEmail);
emailRouter.get('/jobs', getAllJobs);

module.exports = emailRouter;