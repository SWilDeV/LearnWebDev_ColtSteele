var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var friends =["Tony", "Louise","Miranda","Pierre","Lily"];

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends:friends});
});

app.post("/addfriend", function(req,res){
    var newFriend =req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(3000, function(){
    console.log("Server started");
});