const app = require('./src/app');
require('dotenv').config();
require('./listeners/email.listener');

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});