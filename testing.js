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
var Question = mongoose.model('Question');
var Quiz = mongoose.model('Quiz');

///////////////////     INITIALIZATION     /////////////////// 

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


// ADD QA TEST
function addQuestion(courseName, ownerName, question, answers){
    const userQuestion = new Question ({
        courseName: courseName,
        ownerName: ownerName,
        question: question,
        answers: answers
    });
    userQuestion.save();
}
async function addQuestions(){
// var courseName = "ENEL 384";
// var ownerName = "Roxanne";
// var question = "What is my name?";
// var answers = [{answer: "Sara", correct: 0}, {answer: "Martha", correct: 0}, {answer: "Roxanne", correct: 1}]
// await addQuestion(courseName, ownerName, question, answers);
var courseName = "ENEL 384";
var ownerName = "Roxanne";
var question = "What class is this for?";
var answers = [{answer: "ENEL 384", correct: 1}, {answer: "ENSE 352", correct: 0}, {answer: "ENSE 374", correct: 0}]
await addQuestion(courseName, ownerName, question, answers);

}
//UNCOMMENT TO RUN ADD QUESTIONS DB
//addQuestions();





///////////////////     TESTING COMPLETE     ///////////////////



// var getUserQuestions = function (callback) {
//     Question.find(
//         { ownerName: "Roxanne" },
//         {}
//      ).lean().exec(function (err, docs) {
//         if(err){
//             console.log(err);
//             return callback(JSON.stringify(docs));
//         }
//         //console.log(docs); // returns json
//         return callback(JSON.stringify(docs));
//     });
// };

// getUserQuestions(function(userQuestions){
//    console.log(userQuestions);
//     var jsonUserQuestions = JSON.stringify(userQuestions);

//    // console.log(jsonUserQuestions);
//     //console.log(JSON.stringify(userQuestions));
// });

// function getUserCourseQuestions(courseName, callback) {
//     Question.find({ownerName: "Roxanne", courseName: courseName}, function(err, docs) {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, docs);
//       }
//     });
//   };

//   getUserCourseQuestions("ENEL 384", function(err, docs) {
//     if (err) {
//       console.log(err);
//     }
  
//     console.log(docs)
//   });

// function getQuizQuestions(quizQuestions, callback) {
//     Question.find().where('_id').in(quizQuestions).exec((err, docs) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, docs);
//       }
//     });
//   };

// function getAllCourseQuestions(courseName, callback) {
//     Question.find({courseName: courseName}, function(err, docs) {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, docs);
//       }
//     });
//   };

//   function randomizeQuestions(courseName, questionCount){
   
//     getAllCourseQuestions(courseName, function(err, docs) {
//         if (err) {
//           console.log(err);
//         }
//         //console.log(docs);

//         // ADD ALL QUESTION IDS TO AN ARRAY
//         var allQuestionIds = [];
//         docs.forEach(item => {
//          if(item != ''){
//             allQuestionIds.push({
//             _id: item._id
//         });
//              }
//          }
//          );
//          // SHUFFLE FUNCTION
//          function shuffle(array) {
//             array.sort(() => Math.random() - 0.5);
//           }
          
//         // SHUFFLE IDS
//          shuffle(allQuestionIds);
//          //console.log(allQuestionIds);
        
//          // ADD NUMBER OF QUESTIONS TO OUTPUT
//          var quizQuestions = [];
//          for(var i = 0; i< questionCount; i++){
//              quizQuestions.push(allQuestionIds[i]._id)
//          }
//          //console.log(quizQuestions);
//          // GET THE QUESTIONS TO ADD TO QUIZ
//          getQuizQuestions(quizQuestions, function(err, docs) {
//             var questions = [];
//             docs.forEach(item => {
//              if(item != ''){
//             questions.push({
//                 question: item,
//                 answerSelected: ""
//             });
//                  }
//              }
//              );
//              generateQuiz(courseName, "Roxanne", questions, function(err, docs) {
//                     console.log(docs);
//             });
        
//       });
//     });
   
//   }

//   // TEST FUNCTION FOR RANDOMIZATION
//   var courseName = "ENEL 384";
//   var questionCount = 2;
//  // UNCOMMENT AND RUN TO ADD QUIZ QUESTIONS
//   randomizeQuestions(courseName, questionCount);



//   // ADD QA TEST
// function generateQuiz(courseName, ownerName, questions, callback){
//     const quiz = new Quiz ({
//         courseName: courseName,
//         ownerName: ownerName,
//         timeTaken: 0,
//         grade: 0.0,
//         questions: questions
//     });
//     quiz.save(function(err,docs){
//         //console.log(docs);
//         callback(null,docs);
//     });
// }

// async function generateQuizzes(){
//     var courseName = "ENEL 384";
//     var ownerName = "Roxanne";
//     getAllCourseQuestions(courseName, function(err, docs) {
//         if (err) {
//           console.log(err);
//         }
//         //console.log(docs);

//         var questions = [];
//         docs.forEach(item => {
//          if(item != ''){
//         questions.push({
//             question: item,
//             answerSelected: ""
//         });
//              }
//          }
//          );
//          generateQuiz(courseName, ownerName, questions);
//       });
//     }


//generateQuizzes();

function getUserQuizzes(callback) {
    Quiz.find({ownerName: "Roxanne"}, function(err, docs) {
        if (err) {
          callback(err, null);
        } else {
           
          callback(null, docs);
        }
      });
    };

    getUserQuizzes(function(err, docs) {
      
        console.log(docs)
    });