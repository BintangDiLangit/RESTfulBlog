var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

// connection
mongoose.connect("mongodb://localhost/RESTfulBlog", {
  useMongoClient: true
});
// setting
app.use(express.static("node_modules"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
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

app.get('/new-post', function(req, res) {
  res.render('create');
});

app.post('/new-post', function(req, res) {
  var title = req.body.title;
  var image = req.body.image;
  var body = req.body.body;
  var data = {
      title: title,
      image: image,
      body: body
  };
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





// listen port
app.listen(3000, function() {
  console.log('server listening on port 3000');
});
