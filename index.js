const express = require('express');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

require("./config/database").connect();
// route mount 
const user = require('./routes/user');


const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use('/api/v1',user);

app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`);
})