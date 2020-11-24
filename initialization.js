///////////////////     EXPLANATION    /////////////////// 
/*
This file is intended to be an initialization for the 
mongo database used in our Collaborative Quiz application.
        mongo db created: CollaborativeQuiz

By running node initialization.js for this file you will
have access to the following 'Testing' database. 

****        User Model         **** 
Use: Sign in using the following information to have access 
    to a test user and their respective courses and questions
        username: Student
        password: pass

****        Course Model         **** 
Use: 3 test courses will be available for content viewing
    and related question and answer information
        ENEL 384
        ENSE 352
        ENSE 374

****        Q / A Model         **** 
Use: 30 sample questions and answers will be available
    for each of the respective test courses. These questions
    can be viewed, studied, or dynamically added to user
    quizzes upon signing in
*/

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


///////////////////     INITIALIZATION     /////////////////// 

// ****        User Model         **** 


// ****        Course Model         **** 
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

// ****        Q / A Model         **** 
function addQuestion(courseName, ownerName, question, answers, answerExplanation){
    const userQuestion = new Question ({
        courseName: courseName,
        ownerName: ownerName,
        question: question,
        answers: answers,
        answerExplanation: answerExplanation
    });
    userQuestion.save();
}
async function addQuestions(){
// ENEL 384 COURSE QUESTIONS
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "For binary numbers MSB stands for what?";
var answers = [{answer: "Most Signed Bit", correct: 0}, {answer: "Many Signed Bits", correct: 0}, {answer: "Most Significant Bit", correct: 1}]
var answerExplanation = "MSB means Most Significant Bit and refers to the leftmost bit with the highest weight.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);

// COPY LINES 92 - 98 AND FILL IN YOUR QUESTIONS
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "A logical circuit with 3 inputs will have how many possible input conditions?";
var answers = [{answer: "1", correct: 0}, {answer: "8", correct: 1}, {answer: "3", correct: 0}, {answer: "6", correct: 0}]
var answerExplanation = "The number of input combinations is 2^n where n is the number of inputs. Therefore 2^3 = 8 possible conditions.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "What is the decimal number for binary 1001?";
var answers = [{answer: "9", correct: 1}, {answer: "2", correct: 0}, {answer: "17", correct: 0}, {answer: "6", correct: 0}]
var answerExplanation = "1001 = 1*2^3 + 0*2^2 + 0*2^1 + 1*2^0 = 9.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "Boolean variables have how many states?";
var answers = [{answer: "0", correct: 0}, {answer: "1", correct: 0}, {answer: "2", correct: 1}, {answer: "n", correct: 0}]
var answerExplanation = "Boolean variables can have a value of either 0 or 1 therefore 2 possible states.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "What is the correct boolean expression for A 'OR' B?";
var answers = [{answer: "Y = A / B", correct: 0}, {answer: "Y = AB", correct: 0}, {answer: "Y = A + B", correct: 1}]
var answerExplanation = "The symbol for 'or' is + therefore Y = A + B";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "LEDs can be wired to display either active-low or active-high?";
var answers = [{answer: "True", correct: 1}, {answer: "False", correct: 0}]
var answerExplanation = "True. Depending on wiring orientation LEDs can light up with input is high or low.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "In boolean logic 'OR' is performed first, followed by 'AND'?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}, {answer: "There is no precedence.", correct: 0}]
var answerExplanation = "Unless otherwise specified, in Boolean expressions AND functions are performed first, followed by ORs.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "For circuit descriptions SOP stands for?";
var answers = [{answer: "Some Operating Procedure", correct: 0}, {answer: "Sum Of Products", correct: 1}, {answer: "Some Operator Precedence", correct: 0}, {answer: "Sum Of Processes", correct: 0}]
var answerExplanation = "Sum Of Products: A Boolean expression where several product terms are summed (ORed) together.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "Boolean expressions cannot be simplified?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "There are 24 theorems used to minimize a Boolean expression to reduce the number of logic gates in a network.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "Using boolean simplification theorems: x + x = ?";
var answers = [{answer: "x", correct: 1}, {answer: "0", correct: 0}, {answer: "2x", correct: 0}, {answer: "1", correct: 0}]
var answerExplanation = "Theorem 14 states that x + x = x.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "Which of the following K-Map groupings does not result in variables cancelling?";
var answers = [{answer: "pair", correct: 0}, {answer: "triplet", correct: 1}, {answer: "quad", correct: 0}, {answer: "octet", correct: 0}]
var answerExplanation = "Theorem 14 states that x + x = x.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);



// ENSE 352 COURSE QUESTIONS


// ENSE 374 COURSE QUESTIONS

}
//UNCOMMENT TO RUN ADD QUESTIONS DB
//addQuestions();