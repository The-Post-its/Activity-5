
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



///////////////////     Q A MODEL      /////////////////// 
const questionSchema = module.exports = new mongoose.Schema ({
    courseName: String,
    ownerName: String,
    question: String,
    answers: [{
        answer: String,
        correct: Boolean
    }]
})

const Question = module.exports = new mongoose.model("Question", questionSchema)



///////////////////     QUIZ MODEL   /////////////////// 
const quizSchema = module.exports = new mongoose.Schema ({
    courseName: String,
    ownerName: String,
    timeTaken: Date,
    grade: Number,
    
    questions: [{
        question: questionSchema,
        answerSelected: String
    }]
})

const Quiz = module.exports = new mongoose.model("Quiz", quizSchema)


