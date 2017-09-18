var mongoose = require("mongoose");
var Blog = require('./models/blog');
var Comment = require('./models/comment');

var data = [
  {
    title: "title 1",
    image: "https://images.pexels.com/photos/213807/pexels-photo-213807.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "title 2",
    image: "https://images.pexels.com/photos/213807/pexels-photo-213807.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "title 3",
    image: "https://images.pexels.com/photos/213807/pexels-photo-213807.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

// Remove Blog data
function SeedDB() {
  Blog.remove(function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Blog Removed");
    console.log("=======================");
    // add Blog data
    data.forEach(function(seed) {
      Blog.create(seed, function(err, data) {
        if (err) {
          console.log(err);
        }else {
          console.log("Added Blog Post");
          console.log("=======================");
        }
      });
    });
  });
}

module.exports = SeedDB;
