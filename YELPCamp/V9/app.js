const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const seedDB = require('./seeds');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const methodOverride= require('method-override');
const flash = require('connect-flash');


//requiring routes
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

//Tools
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.set('useFindAndModify', false);
app.use(flash());

//Create mongoDB
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


//PASSPORT CONFIG

app.use(require("express-session")({
    secret:"Miro is very annoying",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error =req.flash("Error");
    res.locals.success =req.flash("Success");
    next();
});


app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);



//seedDB(); //Create 3 new campgrounds

//EXPRESS SERVER Route
app.listen(3000,function(){
    console.log('Yelp Server Activated');
});
