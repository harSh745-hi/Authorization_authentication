const express = require('express');

const router = express.Router();

const {login,signup} = require('../controllers/auth');
const User = require("../models/user");
const {auth,isAdmin,isUser} = require('../middleware/auth');

router.post('/login',auth,login);
router.post('/signup',signup);

// testing for  single middleware 
router.get("/test",auth, (req,res) => {
       
    return res.json({
        success:true,
        message:"welcome to protected route for test"
    })

});


// protected route 

router.get("/User",auth,isUser, (req,res) => {
    return res.json({
        success:true,
        message:"welcome to protected route for IsUSeR"
    })
});

router.get("/Admin",auth,isAdmin, (req,res) => {
     return res.json({
        success:true,
        message:"welcome to protected route fro is ADMIN"
     })
})


router.get("/getEmail",auth, async (req,res) => {
try {
     const id = req.user.id;
     const user = await User.findById({id}); 
    return  res.status(200).json({
       success:true,
       user:user,
       message : "welcome to  email route"
    })
}
 catch (error) {
    return res.status(500).json({
        success:false,
        message:"cannot get"
    });
    
}
});
   
module.exports = router;


