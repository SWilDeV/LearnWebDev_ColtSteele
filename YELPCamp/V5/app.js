const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const seedDB = require('./seeds');
const campground = require('./models/campground');
const Comment = require('./models/comment');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//Create mongoDB
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));




app.get('/', function(req,res){
    res.render('landing');
});

//seedDB();
//INDEX ROUTE
app.get("/campgrounds", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index',{campgrounds:allCampgrounds});
        }
    })
});

//NEW ROUTE
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
})

//CREATE ROUTE
app.post("/campgrounds", function(req, res){
    const name=req.body.name;
    const image= req.body.image;
    const description= req.body.description;
    const newCampground = {name:name, image:image, description:description};
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
app.get("/campgrounds/:id",function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
})

//COMMENT ROUTE
app.get("/campgrounds/:id/comments/new", function(req,res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
    });
});

app.post('/campgrounds/:id/comments', function(req,res){
    //lookup campgroud usin ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+ campground._id);
                }
            });

        }
    });
    //Create new comment 
    //connect new comment to campground
    //redirect to campgound show page
});

//default Route
app.get("*", function(req,res){
    res.send('Caught by the star');
});


//EXPRESS SERVER Route
app.listen(3000,function(){
    console.log('Yelp Server Activated');
});