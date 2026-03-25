const express = require('express');
const { sendEmail } = require('../controllers/email.controller');
const emailRouter = express.Router();

emailRouter.post('/send-email', sendEmail);

module.exports = emailRouter;