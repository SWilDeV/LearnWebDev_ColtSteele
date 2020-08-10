const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds=[
    { name:"Salmon Creek", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    { name:"Granit Hill", image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    { name:"Tuna Savior", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    { name:"Salmon Creek", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    { name:"Granit Hill", image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    { name:"Tuna Savior", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    { name:"Salmon Creek", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    { name:"Granit Hill", image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    { name:"Tuna Savior", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"}
]

app.get('/', function(req,res){
    res.render('landing');
});

app.get("/campgrounds", function(req,res){
    
    res.render('campgrounds',{campgrounds:campgrounds});
})

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
})

app.post("/campgrounds", function(req, res){
    const name=req.body.name;
    const image= req.body.image;
    const newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
})

app.get("*", function(req,res){
    res.send('Caught by the star');
});

app.listen(3000,function(){
    console.log('Yelp Server Activated');
});