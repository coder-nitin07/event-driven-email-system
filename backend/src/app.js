const express = require('express');
const emailRouter = require('./routes/email.routes');
const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api', emailRouter);

app.get('/', (req, res)=>{
    res.send("Email Processing System app running...");
});

module.exports = app;