var express = require('express');
var routes = express.Router({mergeParams: true});
var Blog = require('../models/blog');
var Comment = require('../models/comment');
var middlewareObj = require('../middleware/middleware');

// ==============
// Comment Routes
routes.get('/add',middlewareObj.isLogin, function(req, res) {
  var id = req.params.id;
  Blog.findById(id, function(err, data){
    if (err) {
      console.log(err);
    }else{
      res.render('Comment/create', {blog: data});
    }
  });
});

routes.post('/', function(req, res) {
  var id = req.params.id;
  var text = req.body.text;
  var data = {author: {id: req.user._id, username: req.user.username}, text: text};
  // console.log(data);
  Blog.findById(id, function(err, blog) {
    if (err) {
      console.log(err);
    }else{
      // console.log(blog);
      Comment.create(data, function(err, comment) {
        if (err) {
          console.log(err);
        }else{
          blog.comments.push(comment);
          blog.save();
          res.redirect('/blog/post-detail/' + id);
        }
      });
    }
  });
});

routes.get('/:comment_id/edit', function(req,res) {
  var post_id = req.params.id;
  var comment_id = req.params.comment_id;
  // console.log(id);
  Comment.findById(comment_id, function(err, comment) {
    if (err) {
      console.log(err);
    }else {
      // console.log(comment);
      res.render('Comment/edit', {comment: comment, post_id: post_id});
    }
  })
});

routes.post('/:comment_id', function(req, res) {
  // console.log(req.params);
  var comment_id = req.params.comment_id;
  var text = req.body.text;
  // console.log(comment_id);
  Comment.findByIdAndUpdate(comment_id,{text: text}, function(err, comment) {
    if (err) {
      console.log(err);
    }else {
      // console.log(comment);
      res.redirect('/blog/post-detail/' + req.params.id);
    }
  })
});

routes.get('/:comment_id', function(req, res) {
  var comment_id = req.params.comment_id;
  Comment.deleteOne(comment_id, function(err) {
    if (err) {
      console.log(err);
    }else {
      res.redirect('/blog/post-detail/' + req.params.id);
    }
  });
});

module.exports = routes;
