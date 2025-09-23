const mongoose = require('mongoose');

require('dotenv').config();


exports.connect = ()=>{
        mongoose.connect(process.env.MOGODB_URL)
        .then ( ()=>{ console.log("DB connection successfully")})
        .catch( (err) => 
            {    
                // console.log(err);
                 console.log("DB issues");
                 process.exit(1);
                });
} 
