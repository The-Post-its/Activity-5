
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
    password: String,
    enrollment: [{
        type: mongoose.Schema.Types.String,
        ref: 'Course'
    }]
})
userSchema.plugin(passportLocalMongoose);

const User = module.exports = new mongoose.model("User", userSchema)

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


///////////////////     COURSE MODEL   ///////////////////           
const courseSchema = module.exports = new mongoose.Schema ({
    courseName: String
})

const Course = module.exports = new mongoose.model("Course", courseSchema)


function getEnrollment(callback) {
    console.log("GET ENROLLMENT MODEL FUNCTION")
    User.findOne(
        { username: username },
        { _id: 0, enrollment: 1}
     ).lean().exec(function (err, docs) {
        if(err){
            //console.log(err);
        }
        //console.log(docs); // returns json
        callback(docs);
        res.render("home", {username:username, classList: docs});
    });
  };


///////////////////     EXPORTS    /////////////////// 

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Course', courseSchema);