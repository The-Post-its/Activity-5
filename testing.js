///////////////////     REQUIRE     /////////////////// 
const model = require(__dirname + "/model.js");

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

///////////////////     IMPORT     /////////////////// 
var User = mongoose.model('User');                
var Course = mongoose.model('Course');

///////////////////     TESTING     /////////////////// 

// ADD COURSES
function addCourse(courseName){
    const course= new Course ({
        courseName: courseName
    });
    course.save();
}
async function addCourses(){
var courseName = "ENEL 384";
await addCourse(courseName);
var courseName = "ENSE 352";
await addCourse(courseName);
var courseName = "ENSE 374";
await addCourse(courseName);
}
//UNCOMMENT TO RUN ADD COURSES TO DB
//addCourses();

/* TO SEE IN MONGO
> mongo
> show dbs
> use CollaborativeQuiz
> show collections
> db.courses.find()
{ "_id" : ObjectId("5fb152696f272c15be47c160"), "courseName" : "ENEL 384", "__v" : 0 }
{ "_id" : ObjectId("5fb152696f272c15be47c161"), "courseName" : "ENSE 352", "__v" : 0 }
{ "_id" : ObjectId("5fb152696f272c15be47c162"), "courseName" : "ENSE 374", "__v" : 0 }
*/

// ENROLL
function enroll(usernameTest, enrollTest){
    User.findOneAndUpdate(
        { username: usernameTest }, 
        { $addToSet: { enrollment: enrollTest  } },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
             }
         });
}
function clearEnrollment(usernameTest){
    User.findOneAndUpdate(
        { username: usernameTest }, 
        { $set: { enrollment: []  } },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
             }
         });
}
// UNCOMMENT TO CLEAR AND UPDATE ENROLLMENT
// var usernameTest = "Roxanne";
// clearEnrollment(usernameTest);
// var enrollTest = ["ENSE 352", "ENSE 374"];
// enroll(usernameTest, enrollTest);