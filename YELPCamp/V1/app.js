const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get('/', function(req,res){
    res.render('landing');
});

app.get("/campgrounds", function(req,res){
    var campgrounds=[
        { name:"Salmon Creek", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        { name:"Granit Hill", image:"https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80"},
        { name:"Tuna Savior", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    ]
    res.render('campgrounds',{campgrounds:campgrounds});
})


app.get("*", function(req,res){
    res.send('Caught by the star');
});

app.listen(3000,function(){
    console.log('Yelp Server Activated');
});