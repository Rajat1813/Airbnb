 const listing = require ("./models/listing");
 module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be loggedin to create listing");
       return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(currUser._id)){
        req.flash("error" , "You dont have the permission to edit");
        return res.redirect(`/listings/${id}`); 
    }
    next();
};

// module.exports.isLoggedIn = function(req, res, next) {
//     // Check if user is authenticated
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     // If not authenticated, handle the case (e.g., redirect to login page)
//     res.redirect('/login');
// };