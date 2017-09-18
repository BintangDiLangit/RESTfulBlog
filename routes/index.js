var express = require('express');
var routes = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Blog = require('../models/blog');


routes.get('/', function(req, res) {
  Blog.find({}, function(err, data) {
      if (err) {
        console.log(err);
      }else{
        res.render('Blog/index', {blog: data, currentUser: req.user})
      }
  });
});
// Auth Routes
// ===========
routes.get('/login', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('back');
  }
  res.render('Auth/login');
});

routes.post('/login', passport.authenticate("local", { failureRedirect: "/login" }),function(req, res) {
  req.flash('success', 'Hai ' + req.user.username + ' Welcome to My Blog Site');
  res.redirect('/');
});

routes.get('/logout', function(req, res) {
  req.logout();
  req.flash("error", 'success Logout');
  res.redirect('/login');
});

routes.get('/register', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('back');
  }else{
    res.render('Auth/register');
  }
});

routes.post('/register', function(req, res) {
  var username =  req.body.username;
  var password =  req.body.password;

    User.find({'username': username}, function(err, user) {
      // console.log(user);
      if (user.length > 0) {
        // console.log('ada');
        req.flash('error', 'Username is available');
        res.redirect('back');
      }else{
        // console.log('tidak ada');
        User.register(new User({username: username}), password, function(err, user) {
          if (err) {
            return res.render('Auth/register');
          }
            req.flash('success', 'Success sign up, Please login with your account');
            res.redirect('/login');
        });
      }
    });
});


module.exports = routes;
