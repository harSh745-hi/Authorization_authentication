const bcrypt = require('bcrypt');

const User = require('../models/user');
const jwt = require('jsonwebtoken');

require("dotenv").config();

console.log(process.env.JWT_SECRET);

exports.signup = async (req,res) =>{
    try {
        const {name,email,password,role} =req.body;

        // check if user already exist 

        const existUser = await User.findOne({email}); 

        if(existUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }

        // secure password 
       
        let hashedPassword 
        try {
            hashedPassword = await bcrypt.hash(password,10);

            
        } catch (error) {
            
            res.status(500).json({
                success:false,
                message:"cannot create hashPassword"
            })

        }

        // create entry in DB 

        const user = await User.create({
            name,email,password:hashedPassword,role
        })
          
       res.status(200).json({
        success:true,
        message:"User created sucessfully "
       }) 
   
    } 
      catch (error) {
        
        console.error(error)
        res.status(500).json({
           
            success:false,
            message:"user cannot register ,please try again later", 
        });
        
    }
}

//
exports.login = async  (req,res) => {

    try {
        
        // fetch data
        const {email,password} = req.body;

        // check if email and password is filled 
        if(!email || !password)
             {
            return res.status(400).json({
                success:false,
                message:"fill the details",
            });
        }

        //  check in Db user exists 
        let  user =  await User.findOne({email});


        // check if not user registeres 
        if(!user){
           return  res.status(401).json({
                success:false,
                message:"User is not regsitered please signUp"
            })
        }
        
        const payload = {
            email:user.email,
            id: user._id,
            role:user.role 
        };

        // password check compare  
        if(await bcrypt.compare(password,user.password))
        {
      
        // password match 
        let token = jwt.sign(payload,
                          process.env.JWT_SECRET,
                          {
                            expiresIn:"2h",
                          });

       
           user.token = token;
           user.password = undefined;
 
        //    parameter 

           const options = {

            expires:new Date( Date.now() + 3 * 24 *  3000),
            httpOnly:true,
                          }


        //    generate cookies 
         res.cookie("token",token,options).status(200).json({
            success:true,
            user,
            token,
            message:"user Logged in succesfully"
         });

  
        }

        else{
           return  res.status(403).json({
                success:false,
                message :"password does not  match"
            })
        }



    } catch (error) {

        console.log(error);
         
        return  res.status(500).json({
            
        success:false,
        message:"Login Failure"

       });
        
    }
 }

 
