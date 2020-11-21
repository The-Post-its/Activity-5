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
mongoose.set('useFindAndModify', false);
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
const { clear } = require("console");
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost:27017/CollaborativeQuiz", 
                {useNewUrlParser: true,
                 useUnifiedTopology: true});



                 
 ///////////////////     IMPORT     ///////////////////                 
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Question = mongoose.model('Question');

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

getEnrollment(function(enrollment){
    res.render("home", {classList: enrollment});
});

});

// MANAGE COURSES
app.post("/manageCourses",
function(req,res){
    var username = ssn.email;

    Course.find(function (err, docs1) {
        User.findOne(
            { username: ssn.email },
            { _id: 0, enrollment: 1}
            ).lean().exec(function (err, docs2) {
                res.render("courseSelection", {
                    courseList : docs1,
                    classList : docs2
                });
        });
    });
});

// SAVE COURSES
app.post("/saveCourses",
async function(req,res){
    await getCourses(function(callback){
        var updateEnrollment = [];
        for (var item of callback){
            var checkBox = req.body[item.courseName];
            if(checkBox == 'on')
            {
                updateEnrollment.push(item.courseName);
            }
        }
        //console.log(updateEnrollment);
    enroll(ssn.email, updateEnrollment);
});
    
res.redirect(307, "/home")
});


// COURSE MATERIAL  
app.post("/courseMaterial",
function(req,res){
    var courseName = req.body.courseName;

    getUserCourseQuestions(courseName, function(err, docs) {
        if (err) {
          console.log(err);
        }
      
        //console.log(docs)
        res.render("courseMaterial",{
            courseName: courseName,
            userCourseQuestions: docs
        });
      });

});

// ADD QUESTION 
app.post("/addQuestion",
async function(req,res){
    var courseName = req.body.courseName;
    var ownerName = ssn.email;
    var question = req.body.question;
    var correctAnswer = req.body.correctAnswer;
    var answerArray = req.body.answer;

       var answers = [];
       // push correct answer
       answers.push({answer: correctAnswer, correct: 1});
       // push incorrect answers
       answerArray.forEach(item => {
        if(item != ''){
       answers.push({
           answer: item,
           correct: 0
       });
            }
        }
        );
 // add question to database
    await addQuestion(courseName, ownerName, question, answers);
// reload the page
    res.redirect(307, "/courseMaterial")

});

// QUIZ
app.post("/quiz",
function(req,res){
    getUserQuestions(function(userQuestions){
       // console.log(userQuestions);
        // var jsonUserQuestions = JSON.stringify(userQuestions);
    
        // console.log(jsonUserQuestions);
        //console.log(JSON.stringify(userQuestions));
        res.render("quiz", {
           userQuestions : userQuestions
        });

    });
    
});

// LOGOUT
app.get("/logout",
function(req,res){
    req.logout();
    res.redirect("/");
});

///////////////////     FUNCTIONS     /////////////////// 

var getEnrollment = function (callback) {
    User.findOne(
        { username: ssn.email },
        { _id: 0, enrollment: 1}
     ).lean().exec(function (err, docs) {
        if(err){
            console.log(err);
            return callback(docs);
        }
        //console.log(docs); // returns json
        return callback(docs);
    });
};

var getCourses = function (callback) {
    Course.find({},{ _id: 0, courseName: 1}).lean().exec(function (err, docs) {
        if(err){
            console.log(err);
            return callback(docs);
        }
        //console.log(docs); // returns json
        return callback(docs);
    });
};

async function enroll(usernameTest, enrollTest){
    await clearEnrollment(ssn.email);
    await User.findOneAndUpdate(
        { username: usernameTest }, 
        { $addToSet: { enrollment: enrollTest  } },
       function (error, success) {
             if (error) {
                 //console.log(error);
             } else {
                 //console.log(success);
             }
         });
}
function clearEnrollment(usernameTest){
    User.findOneAndUpdate(
        { username: usernameTest }, 
        { $set: { enrollment: []  } },
       function (error, success) {
             if (error) {
                 //console.log(error);
             } else {
                 //console.log(success);
             }
         });
}


var getUserQuestions = function (callback) {
    Question.find(
        { ownerName: ssn.email },
        {}
     ).lean().exec(function (err, docs) {
        if(err){
            console.log(err);
            return callback(docs);
        }
        //console.log(docs); // returns json
        return callback(docs);
    });
};

// var getUserCourseQuestions = function (callback) {
//     Question.find(
//         { ownerName: ssn.email },
//         {}
//      ).lean().exec(function (err, docs) {
//         if(err){
//             console.log(err);
//             return callback(docs);
//         }
//         //console.log(docs); // returns json
//         return callback(docs);
//     });
// };

function getUserCourseQuestions(courseName, callback) {
    Question.find({ownerName: ssn.email, courseName: courseName}, function(err, docs) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, docs);
      }
    });
  };


function addQuestion(courseName, ownerName, question, answers){
    const userQuestion = new Question ({
        courseName: courseName,
        ownerName: ownerName,
        question: question,
        answers: answers
    });
    userQuestion.save();
}
// async function addQuestions(){
// // var courseName = "ENEL 384";
// // var ownerName = "Roxanne";
// // var question = "What is my name?";
// // var answers = [{answer: "Sara", correct: 0}, {answer: "Martha", correct: 0}, {answer: "Roxanne", correct: 1}]
// // await addQuestion(courseName, ownerName, question, answers);
// var courseName = "ENEL 384";
// var ownerName = "Roxanne";
// var question = "What class is this for?";
// var answers = [{answer: "ENEL 384", correct: 1}, {answer: "ENSE 352", correct: 0}, {answer: "ENSE 374", correct: 0}]
// await addQuestion(courseName, ownerName, question, answers);

// }