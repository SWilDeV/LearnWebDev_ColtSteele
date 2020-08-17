var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
const { estimatedDocumentCount } = require('../models/comment');
const middleware = require('../middleware');


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
router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//CREATE ROUTE
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
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


//EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id, function(err,foundCampground){
            res.render("campgrounds/edit", {campground:foundCampground});    
        });
});

//UPDATE CAMPGROUND ROUT
router.put('/campgrounds/:id',middleware.checkCampgroundOwnership, function(req,res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/'+ req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function (req,res){
    Campground.findByIdAndDelete(req.params.id, req.body.campground, function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/');
        }
    });
});

module.exports = router;