var express = require("express");
var app = express();

// "/" => "Hi There"
// " bye" => "goodbye"

app.get("/", function(req, res){
    res.send("Hi Thererr!");
});

app.get("/bye",function(req, res){
    res.send("Goodbyeeee");
});

app.get("/r/:subreddit",function(req, res){
    res.send("Welcome to a subreddit");
});

app.get("/dog", function(req, res){
    console.log("Someone tried to access /dog");
    res.send("Meow");
});

app.get("*", function(req, res){
    res.send("You are a star!");
});

app.listen(3000, function(){
    console.log("Serving dog demo on port 3000");
});