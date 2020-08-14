var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");


//INDEX ROUTE
router.get("/campgrounds", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index',{campgrounds:allCampgrounds});
        }
    });
});

//NEW ROUTE
router.get("/campgrounds/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//CREATE ROUTE
router.post("/campgrounds", isLoggedIn, function(req, res){
    const name=req.body.name;
    const image= req.body.image;
    const description= req.body.description;
    var author ={
        id:req.user._id,
        username: req.user.username
    };
    const newCampground = {name:name, image:image, description:description, author:author};
    //Create a new campground and save in the DB
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//SHOW ROUTE - to add more specific information
router.get("/campgrounds/:id",function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

//Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;