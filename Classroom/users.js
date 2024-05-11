
const express = require ("express");
const router = express.Router();
/////usersss//////////////////////

////index route///
router.get("/users",(req , res) =>{
    res.send("hiii");
console.log("hello route");
});

////show route///
router.get("/users/:id",(req , res) =>{
    res.send("hiii");
console.log("hello route");
});

/////post ////
router.post("/users",(req , res) =>{
    res.send("hiii");
console.log("hello route");
});

///Delete/////
router.delete("/users/:id",(req , res) =>{
    res.send("hiii");
console.log("hello route");
});

module.exports = router; 