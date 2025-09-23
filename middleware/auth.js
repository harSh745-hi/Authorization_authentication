const jwt = require('jsonwebtoken');

require('dotenv').config();


// fetching token 
exports.auth = (req,res,next) => {
   
   try {
     

    console.log("body",req.body.token);
    console.log("cookie",req.cookies.token);
      const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

      if(!token){
       return res.status(401).json({
        success:false,
         message:"Token Not found "
      })
      }

    //   token verify 

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);

        req.user = decode;
    } 
    catch (error) {
      
         return res.status(401).json({
            success:false,
            message:"token invalid"
         })
        
    }
    next();
   }
    catch (error) {
      
    return res.status(401).json({
        success:false,
        message:"something went wrong , while verifying the token "
    })

    

   }  
}


exports.isUser = (req,res,next) => {
    try {
        
        if(req.user.role !== "user"){
            return res.status(401).json({
                success:false,
                message:"tHIS IS protected route for user"
            })
        }
        next();

    } catch (error) {

          return res.status(500).json({
            success:false,
            message:"Role does not match"
          })

        
    }
}

exports.isAdmin = (req,res,next) => {
    try {
        
        if(req.user.role !== "admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
        next();

    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Role does not match"
        })
    }
}