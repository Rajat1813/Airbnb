const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema =  new Schema({   
    title: {
        type:String,
        required :true,

    },
    description:String,
    image: {
        url : String,
        filename: String,

    },
        
   
    
     
    // image:{
        
    //      type :String,
    //      default:"https://unsplash.com/photos/blue-wooden-house-near-body-of-water-during-daytime-HRlCTncry2Y",
    //       ///ser ki value set karne ke liye its like if else statement.
    //      set :(v) => v==="" ? "https://unsplash.com/photos/a-group-of-people-walking-down-a-street-at-night-CFJI5is-06Y" :v,

    // },
    price :Number,
    location :String,
    country:String,

    reviews :[
        {
             type: mongoose.Schema.Types.ObjectId,
             ref :"Review",
        },
],
    owner :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

});

const Listing=mongoose.model("listing",listingSchema);

module.exports=Listing;
