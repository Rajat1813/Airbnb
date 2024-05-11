
const express = require ("express");
const router = express.Router();





//posts
////index route//////////////////////////////////////////////////////////
router.get("/posts",(req , res) =>{
    res.send("hiii");
console.log("hello route");
});

////show route///
router.get("/posts/:id",(req , res) =>{
    res.send("hiii"); 
console.log("hello route");
});

/////post ////
router.post("/posts",(req , res) =>{
    res.send("hiii");
console.log("hello route");
});

///Delete/////
router.delete("/posts/:id",(req , res) =>{
    res.send("hiii");
console.log("hello route");
});

module.exports = router; 