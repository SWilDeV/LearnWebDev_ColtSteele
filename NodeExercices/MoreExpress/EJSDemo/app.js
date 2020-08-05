var express = require("express");
var app =express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req,res){
    const thing = req.params.thing;
    res.render("love", {thingVar:thing})
});

app.get("/posts", function(req, res){
    var posts = [
        {title:"post 1", author: "Susy"},
        {title:"post 2", author: "billy"},
        {title:"post 3", author: "jacques"},
    ];
    res.render("posts", {posts:posts});
});

app.get("*", function(req,res){
    res.send("sorry, page not found");
});

app.listen(3000, function(){
    console.log("MoreExpress on port 3000");
}); 