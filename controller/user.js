     const user = require ("../models/user");
     
     
     module.exports.renderSignUpForm = (req,res)=>{
        res.render("signup.ejs");
    };
      
      
      
      
      
      module.exports.signup = async (req,res) =>{
    let {username ,email ,password} = req.body;
    const newUser = new user({email,username});
    const registerUser = await user.register(newUser , password);
    console.log(registerUser);

    req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success" , "Welcome to Wanderlust!")
    res.redirect("/listings");
    }
);
     };

     module.exports.renderLoginForm = (req ,res)=>{
        res.render("login.ejs");
     };

    //  module.exports.login = async(req,res) =>{

    //     req.flash("success" , "welcome to wanderlust !!");
    //     let redirecturl = res.locals.redirectUrl || "/listings";
    //     res.redirect("redirectUrl");
    
    //  };

     module.exports.logout = (req ,res,next)=>{
        req.logout((err)=>{
           if (err){
               return next(err);
           }
           req.flash("success" , "You are logged out now!")
        })
   
        res.redirect("/listings");
   
   
    }