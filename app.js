var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressSanitizer = require('express-sanitizer');
    app = express();

// connection
mongoose.connect("mongodb://localhost/RESTfulBlog", {
  useMongoClient: true
});
// setting
app.use(express.static("node_modules"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
// schema
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
// model
var Blog = mongoose.model("Blog", blogSchema);

// Restful Routes
app.get('/', function(req, res) {
  Blog.find({}, function(err, data) {
      if (err) {
        console.log(err);
      }else{
        res.render('index', {blog: data})
      }
  });
});

// get all post
app.get('/new-post', function(req, res) {
  res.render('create');
});

// create new post
app.post('/new-post', function(req, res) {
  var title = req.sanitize(req.body.title);
  var image = req.sanitize(req.body.image);
  var body = req.sanitize(req.body.body);
  var data = {
      title: title,
      image: image,
      body: body
  };
  // console.log(data);
  // req.sanitize(data.body);
  // console.log(data);
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
app.get('/post-detail/:id', function(req,res) {
  var id = req.params.id;
  // console.log(id);
  Blog.findOne({_id: id}, function(err, data) {
    if (err) {
      console.log(err);
    }else{
      // console.log(data);
      res.render('show', {blog: data});
    }
  });
});

// get Edit
app.get('/edit-post/:id', function(req,res) {
  var id = req.params.id;
  Blog.findOne({_id: id}, function(err, data) {
    if (err) {
      console.log(err);
    }else{
      res.render('edit', {blog: data});
    }
  });
});

// update date
app.post('/edit-post/:id/update', function(req,res) {
  var id = req.params.id;
  var title = req.body.title;
  var image = req.body.image;
  var body = req.body.body;
  Blog.findByIdAndUpdate(id, {title: title, image: image, body: body}, function(err, data) {
    if (err) {
      console.log(err);
    }else{
      // console.log(data);
      res.redirect('/post-detail/' + req.params.id);
    }
  });
});

// delete data
app.get('/delete-post/:id', function(req,res) {
  var id = req.params.id;
  Blog.deleteOne(id, function(err) {
    if (err) {
      console.log(err);
    }else{
      res.redirect('/');
    }
  })
});



// listen port
app.listen(3000, function() {
  console.log('server listening on port 3000');
});
