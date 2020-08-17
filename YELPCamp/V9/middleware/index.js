// all the middleware goes here
const middlewareObj= {};
const Comment = require('../models/comment');
const Campground = require('../models/campground');

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    
    if(req.isAuthenticated()){ //is User logged in
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                req.flash("Error", "Campground not found");
                res.redirect('back');
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                        next();
                }else{
                    req.flash("Error", "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    }else{
        req.flash("Error", "You need to be logged in to do that");
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){ //is User logged in
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                res.redirect('back');
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                        next();
                }else{
                    req.flash("Error", "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    }else{
        req.flash("Error", "You need to be logged in to do that");
        res.redirect('back');
    }
};

//Middleware
middlewareObj.isLoggedIn =function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("Error", "You need to be logged in");
    res.redirect('/login');
}

module.exports = middlewareObj;