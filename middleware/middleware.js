var Blog = require('../models/blog');

var middlewareObj = {};

middlewareObj.isLogin = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please login first');
  res.redirect('/login');
}

middlewareObj.OwnerPost = function(req, res, next) {
  if (req.isAuthenticated()) {
    var id = req.params.id;
    Blog.findOne({_id: id}, function(err, data) {
      if (err) {
        console.log(err);
      }else{
        // console.log(req.user._id);
        if (data.author.id.equals(req.user._id)) {
          next();
        }else {
          req.flash('error', 'Permission Denied');
          res.redirect('back');
        }
      }
    });
  }else {
    req.flash('error', 'Please Login First');
    res.redirect('back');
  }
}

middlewareObj.OwnerComment = function(req, res, next) {
  if (req.isAuthenticated()) {
    var id = req
  }
}

module.exports = middlewareObj;
