var express = require('express');
var routes = express.Router();
var Blog = require('../models/blog');
var middlewareObj = require('../middleware/middleware');


// get all post
routes.get('/new-post',middlewareObj.isLogin, function(req, res) {
  res.render('Blog/create');
});

// create new post
routes.post('/new-post', function(req, res) {
  var title = req.sanitize(req.body.title);
  var image = req.sanitize(req.body.image);
  var body = req.sanitize(req.body.body);
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var data = {
      title: title,
      image: image,
      body: body,
      author: author
  };

  Blog.create(data, function(err, data) {
    if (err) {
      console.log(err)
    }else{
      // console.log(data);
      res.redirect('/');
    }
  });
});

// show post
routes.get('/post-detail/:id', function(req,res) {
  var id = req.params.id;
  // console.log(id);
  Blog.findOne({_id: id}).populate("comments").exec(function(err, data) {
    if (err) {
      console.log(err);
    }else{
      // console.log(data);
      res.render('Blog/show', {blog: data});
    }
  });
});

// get Edit
routes.get('/edit-post/:id',middlewareObj.OwnerPost, function(req,res) {
    var id = req.params.id;
    Blog.findOne({_id: id}, function(err, data) {
      if (err) {
        console.log(err);
      }else{
        // console.log(req.user._id);
        if (data.author.id.equals(req.user._id)) {
          res.render('Blog/edit', {blog: data});
        }else {
          res.send('Permission Denied');
        }
      }
    });
});

// update date
routes.post('/edit-post/:id/update', function(req,res) {
  var id = req.params.id;
  var title = req.body.title;
  var image = req.body.image;
  var body = req.body.body;
  Blog.findByIdAndUpdate(id, {title: title, image: image, body: body}, function(err, data) {
    if (err) {
      console.log(err);
    }else{
      // console.log(data);
      res.redirect('/blog/post-detail/' + req.params.id);
    }
  });
});

// delete data
routes.get('/delete-post/:id',middlewareObj.OwnerPost, function(req,res) {
  if (req.isAuthenticated()) {
    var id = req.params.id;
    Blog.deleteOne(id, function(err, data) {
      if (err) {
        console.log(err);
      }else{
          res.redirect('/');
        }
    });

  }else{
    res.redirect('/login');
  }
});

module.exports = routes;
