const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
        },
    email: {
        type:String,
        trim:true,
        required:true
    } ,
    password : {
        type:String,
        required:true
    } ,
    role : {
        type:String,
    
        enum:["admin","user","visitor"]
    } ,  


}); 

module.exports = mongoose.model("user",userScehma);
