const express = require ("express");
const router = express.Router();
const user = require("../models/user.js");
const passport = require ("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require ("../controller/user.js");
const wrapAsync = require("../util/wrapAsync.js");


router.get("/signup",usercontroller.renderSignUpForm);

router.post("/signup", (usercontroller.signup));
    

 router.get("/login" , usercontroller.renderLoginForm);
  
//  router.post("/login",passport.authenticate("local" ,{failureRedirect:"/login" , failureFlash :"true"}),  (async(req,res)=>{
//     req.flash("");
//     res.redirect("/listings");
//  }));


router.post("/login",passport.authenticate("local" ,{failureRedirect:"/login" , failureFlash :"true"}),(req,res)=>{
   req.flash("success" ,"Welcome");
   res.redirect("/listings");
});



 router.get("/logout" , usercontroller.logout);



module.exports = router;