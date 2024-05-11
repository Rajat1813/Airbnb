const express = require ("express");
const router = express.Router();
const user = require("../models/user.js");
const passport = require ("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require ("../controller/user.js");


router.get("/signup",usercontroller.renderSignUpForm);

router.post("/signup", (usercontroller.signup));
    

 router.get("/login" , usercontroller.renderLoginForm);
  
 router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login",faiureFlash : true}), usercontroller.login);


 router.get("/logout" , usercontroller.logout);



module.exports = router;