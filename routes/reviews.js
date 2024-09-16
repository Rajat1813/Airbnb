const express = require ("express");
const router = express.Router({mergeParams:true});
const wrapAsync= require("../util/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../util/ExpressError.js");
const Listing =require("../models/listing.js");
const Review  = require("../models/review.js");
const reviewController = require ("../controller/review.js");
const {isLoggedIn} = require("../middleware.js")

const validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400 ,error); 
    }else{
        next();
    }
}


///review /////

// router.post("/" ,validateReview,wrapAsync(reviewController.createReview ));

router.post("/" ,isLoggedIn ,wrapAsync(reviewController.createReview ));
 
 
 ///delete////
 router.delete("/:reviewId", wrapAsync( reviewController.deleteReview));


 module.exports = router;