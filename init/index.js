const mongoose=require("mongoose");
const initData= require("./data.js");
const Listing =require("../models/listing.js");

/// database moongosse connection   ////////////////////////////////////////////////////////////

main().then( () =>{
    console.log("connected to Db");
})

.catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}
//////////////////////////////////////////////////////////////////////////////////////////


const initDb =async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner: "662626904294d24acad785a6"}));
    await Listing.insertMany(initData.data);
    console.log("data was initailized");
};

initDb();