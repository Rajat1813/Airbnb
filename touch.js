if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}


const express = require("express");
const MongoStore = require('connect-mongo');
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing = require("./models/listing.js");

const Review  = require("./models/review.js");


const listings = require("./routes/listings.js");
const reviews = require("./routes/reviews.js");
const userRouter = require("./routes/user.js"); 


const session = require("express-session");
const flash = require ("connect-flash");
const passport = require ("passport");
const Localstrategy = require("passport-local");
const User  = require("./models/user.js");



const port= 8080;
/////for views connection
const path =require("path");  
const methodOverride = require("method-override");   
const ejsMate = require("ejs-mate"); 
const wrapAsync= require("./util/wrapAsync.js");
const ExpressError = require("./util/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");


app.set("view engine","ejs");        /////for views connection set the views engine
app.engine("ejs",ejsMate);
app.set("views",path.join(__dirname,"views"));/////for views connection for views connection set the views directory
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"/public")));  ///css

const dbUrl = process.env.ATLASDB_URL;

/// database moongosse connection   ////////////////////////////////////////////////////////////
main().then( () =>{
    console.log("connected to Db");
})

.catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect( dbUrl);
    
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// app.get("/" , (req ,res) => {
//  res.send("working");
// });

const sessionOptions = {
    
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge :7 * 24 * 60 * 60 * 1000,
        httpOnly :true,
    }

}; 

5

app.use (session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req ,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser" ,async(req,res)=>{
//     let fakeuser = new User({
//         email : "rajat@gmail.com",
//         username : "rajat"
//     });

//    let user = await User.register(fakeuser,"helloworld");
//    res.send(user);

// })
   
app.use ("/listings", listings);

app.use ("/listings/id:/reviews" , reviews);

app.use ("/", userRouter);


// const listingId = '6610e127016234f97f1f31e0'; // Replace with the actual listing ID
// const reviewIdToRemove = '661bd05c724dba9efa255f6e'; // Replace with the review ID you want to remove

// Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewIdToRemove } }, { new: true })
//     .then(updatedListing => {
//         console.log('Listing updated successfully:', updatedListing);
//     })
//     .catch(error => {
//         console.error('Error updating listing:', error);
//     });

// app.get("/listings", async(req ,res) => {
//     const allListing= await Listing.find({}); 
//     res.render("/listings/main",{allListing});
//    });

// app.get("/testlis" , async(req ,res) => {

//     let sampleListing = new Listing({
        
//         title: "my new vila",
//         description:"by the beach",
//         price:1200,
//         location:"goa",
//         country:"india",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("working data created");
//    });

app.all("*",(req,res,next )=>{
    next(new ExpressError(404,"pagenot found"));
});
   
app.use((err,req,res,next) =>{
    let {statusCod=500,message= "something went wrong!"} = err
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

app.listen(port , () => {
    console.log("working");
   });






  