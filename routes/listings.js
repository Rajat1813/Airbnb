const express = require ("express");
const router = express.Router();

const wrapAsync= require("../util/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../util/ExpressError.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner} = require ("../middleware.js");

const listingController = require ("../controller/listing.js");



const multer  = require('multer');
const {storage } = require("../cloudconfig.js");
const upload = multer({ storage });

// const validateListing=(req,res,next)=>{
//     let {error} = listingSchema.validate(req.body);
//     if(error){
//         throw new ExpressError(400 ,error); 
//     }else{
//         next();
//     }
// }
 
///main route
router.get("/",wrapAsync(listingController.main));


////new route
router.get("/new" ,isLoggedIn, listingController.renderNewForm);

/////create royte
 router.post("/",isLoggedIn,upload.single("listing[image]"), wrapAsync(listingController.createListing));


/////show  route
router.get("/:id", isLoggedIn ,wrapAsync(listingController.showlisting));

                                                                      /// 1 way to extract form data let {title,description,price,image,loaction.country} =req.body;
/////create request post reuest accept karenge                                                                     //let listing = req.body.listing;
// router.post("/", validateListing,wrapAsync (listingController.createListing));

// router.post("/",  upload.single("listing[image]"),  (req, res, ) =>{
//     res.send(req.file);

// });



router.post("/",  upload.single("listing[image]"),  async(req, res, ) =>{
    let url = req.file.path;
    let filename = req.file.filename;

   
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url ,filename};

    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
    // res.send(req.file);
});
  



///edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


///update
router.put("/:id",isLoggedIn,isOwner, upload.single("listing[image]"), wrapAsync(listingController.updateListing));

///DELETE ROUTE
router.delete("/:id", isLoggedIn ,isOwner, wrapAsync(listingController.deletelisting));

module.exports = router;