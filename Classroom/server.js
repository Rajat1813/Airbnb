const express = require("express");
const app = express();
const posts = require ("./posts.js");
const users = require ("./users.js");

app.use("/posts" , posts);

app.use("/users" , users);

app.get("/",(req , res) =>{
    res.send("hiii");
console.log("hello route");
});




app.listen(3000,() =>{
    console.log("server3000 is listening");

});