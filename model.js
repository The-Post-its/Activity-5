
///////////////////     REQUIRE     /////////////////// 

// EXPRESS JS
const express = require("express");
const app = express();

// MONGOOSE
const mongoose = require("mongoose");

// PASSPORT
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
app.use(passport.initialize());
app.use(passport.session());

// DATABASE
mongoose.connect("mongodb://localhost:27017/CollaborativeQuiz", 
                {useNewUrlParser: true, 
                 useUnifiedTopology: true});



///////////////////     USER MODEL   ///////////////////           
const userSchema = module.exports = new mongoose.Schema ({
    username: String,
    password: String
})
userSchema.plugin(passportLocalMongoose);

const User = module.exports = new mongoose.model("User", userSchema)

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





///////////////////     EXPORTS    /////////////////// 
module.exports = mongoose.model('User', userSchema);