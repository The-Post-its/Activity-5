///////////////////     REQUIRE     /////////////////// 
const fs = require("fs");
const model = require(__dirname + "/model.js");

// EXPRESS JS
const express = require("express");
const app = express();
const port = 3000;
app.listen(port,
    function(){
        console.log("server is running on port " + port);
    });
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

// MONGOOSE
const mongoose = require("mongoose");
const session = require("express-session");

require("dotenv").config();
app.use(session({
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: false
}));

// PASSPORT
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost:27017/CollaborativeQuiz", 
                {useNewUrlParser: true,
                 useUnifiedTopology: true});



                 
 ///////////////////     IMPORT     ///////////////////                 
var User = mongoose.model('User');

///////////////////     ROUTING     /////////////////// 

// ROOT PAGE
app.get("/",
function(req,res){
    res.render("index");
});

// LOGIN CONTROLLER
app.post('/login', function(req,res, next) {
    console.log("LOGIN CONTROLLER")
    
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          ssn = req.session;
          ssn.email=req.body.username;
          return res.redirect(307, "/home");
        });
      })(req, res, next);
  });

// REGISTER CONTROLLER
app.post("/register", function(req, res) {
    console.log("REGISTER CONTROLLER");

    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    if(password== confirmPassword){ 
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect("/")
        } else {
            passport.authenticate("local")(req, res, function(){
                ssn = req.session;
                ssn.email=req.body.username;
                res.redirect(307, "/home")
            });
        }
    });
 }else{res.redirect("/")}
});

// HOME
app.post("/home", function(req, res) {
var username = req.body.username;
res.render("home", {username:username});
});

// LOGOUT
app.get("/logout",
function(req,res){
    req.logout();
    res.redirect("/");
});