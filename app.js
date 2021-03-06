var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressSanitizer = require('express-sanitizer'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    Blog = require('./models/blog'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    SeedDB = require('./seeds'),
    app = express();

// import routes
var indexRoutes = require('./routes/index'),
    postRoutes = require('./routes/post'),
    commentRoutes = require('./routes/comment');

// connection localhost
// mongoose.connect("mongodb://localhost/RESTfulBlog", {
//   useMongoClient: true
// });
// conection on mongolab
mongoose.connect("mongodb://bangadam:bangadam@ds147044.mlab.com:47044/restfulblog")

// setting
app.use(express.static("node_modules"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
// Setting for auth
app.use(require('express-session')({
  secret: 'secret password',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash message
app.use(cookieParser('secret'));
// app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

// mendaftarkan variable secara global
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});

app.use('/', indexRoutes);
app.use('/blog/', postRoutes);
app.use('/blog/post-detail/:id/comment', commentRoutes);


// listen port
app.listen(process.env.PORT, process.env.IP, function() {
  console.log('server is running');
});
