///////////////////     EXPLANATION    /////////////////// 
/*
This file is intended to be an initialization for the 
mongo database used in our Collaborative Quiz application.
        mongo db created: CollaborativeQuiz

By running node initialization.js for this file you will
have access to the following 'Testing' database. 

****        User Model         **** 
Use: Register using the following information to have access 
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
Use: Sample questions and answers will be available
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
            
var Course = mongoose.model('Course');
var Question = mongoose.model('Question');


///////////////////     INITIALIZATION     /////////////////// 


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
addCourses();

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
var ownerName = "Roxanne";
var question = "For binary numbers MSB stands for what?";
var answers = [{answer: "Most Signed Bit", correct: 0}, {answer: "Many Signed Bits", correct: 0}, {answer: "Most Significant Bit", correct: 1}]
var answerExplanation = "MSB means Most Significant Bit and refers to the leftmost bit with the highest weight.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Roxanne";
var question = "A logical circuit with 3 inputs will have how many possible input conditions?";
var answers = [{answer: "1", correct: 0}, {answer: "8", correct: 1}, {answer: "3", correct: 0}, {answer: "6", correct: 0}]
var answerExplanation = "The number of input combinations is 2^n where n is the number of inputs. Therefore 2^3 = 8 possible conditions.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Roxanne";
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
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "Part of a Boolean expression where one or more true or complement variables are ANDed ?";
var answers = [{answer: "Product term", correct: 1}, {answer: "Sum term", correct: 0}]
var answerExplanation = "For product term, the boolean expression has one or more true complement variables which are ANDed.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "Priority Encoder is defined as an encoder that generates a code based on random input ?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "Priority Encoder: An encoder that generates a code based on the highest priority input.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "An erroneous carry into the sign bit of a signed binary number is defined as ?";
var answers = [{answer: "Carry bit", correct: 0}, {answer: "Overflow", correct: 1}, {answer: "1's complement", correct: 0}]
var answerExplanation = " An erroneous carry into the sign bit of a signed binary number is defined as Overflow";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "BCD is an abbreviation for?";
var answers = [{answer: "Bit carry decimal", correct: 0}, {answer: "Binary code digit", correct: 0}, {answer: "Bit code division", correct: 0}, {answer: "Binary coded decimal", correct: 1}]
var answerExplanation = "The radix point for binary numbers is called a Binary Point";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "Overflow happens if the sign bits of the operands are same ?";
var answers = [{answer: "False", correct: 1}, {answer: "True", correct: 0}]
var answerExplanation = "Overflow is not possible if the sign bits of theoperands are different from each other.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "Which is not a sequential circuit element ?";
var answers = [{answer: "Catch", correct: 1}, {answer: "Flip-Flop", correct: 0}, {answer: "Latch", correct: 0}]
var answerExplanation = "There are only two basic types, latch and flip-flop.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 384";
var ownerName = "Student";
var question = "The condition where the closure of a switch contact results in a mechanical bounce before the final contact is made. This condition is called?";
var answers = [{answer: "Logic bounce", correct: 0}, {answer: "Switch latch", correct: 0}, {answer: "Logic Latch", correct: 0} , {answer: "Switch bounce", correct: 1} ]
var answerExplanation = " An erroneous carry into the sign bit of a signed binary number is defined as Overflow";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);



// ENSE 352 COURSE QUESTIONS
var courseName = "ENSE 352";
var ownerName = "Roxanne";
var question = "ROM (Read Only Memory) is not randomly accessible?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "False. RAM and ROM are both randomly accessible. Even though ROM is read-only, it can still be accessed.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Roxanne";
var question = "In von Neummann architecture data and instructions are _____ ?";
var answers = [{answer: "Both stored together in the same memory", correct: 1}, {answer: "Stored in their own memory", correct: 0}, {answer: "von Neummann is not an architecture", correct: 0}, {answer: "Not stored in memory", correct: 0}]
var answerExplanation = "Data and instructions are both stored together in the same memory, and accessed through a single bus. Commonly used in general purpose computers.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Student";
var question = "In binary the integer part and fractional part are seperated by a dot called?";
var answers = [{answer: "The decimal point", correct: 0}, {answer: "The binary point", correct: 0}, {answer: "The radix point", correct: 0}, {answer: "All of the above", correct: 1}]
var answerExplanation = "These are all correct. In some cultures this dot is instead a comma.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Student";
var question = "A pointer is a location in memory?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "In address is a location in memory while a pointer is a data object that contains an address.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Student";
var question = "In two's complement arithmetic which expression gives -x?";
var answers = [{answer: "-x", correct: 0}, {answer: "~x", correct: 0}, {answer: "~x+1", correct: 1}, {answer: "~x-1", correct: 0}]
var answerExplanation = "Example binary 001: ~x = 110 + 1 = 111 = -x therefore ~x+1.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Student";
var question = "In two's complement arithmetic which expression gives -x?";
var answers = [{answer: "-x", correct: 0}, {answer: "~x", correct: 0}, {answer: "~x+1", correct: 1}, {answer: "~x-1", correct: 0}]
var answerExplanation = "Example binary x = 001: ~x = 110 + 1 = 111 = -x therefore ~x+1.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Student";
var question = "For an unsigned value x: x>>1 performs what operation?";
var answers = [{answer: "x/1", correct: 0}, {answer: "x*2", correct: 0}, {answer: "x/2", correct: 1}, {answer: "x-1", correct: 0}]
var answerExplanation = "Example binary x = 0100 = 4: x>>1 = 0010 = 2 therefore x/2.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Student";
var question = "For floating point numbers, k is used to denote what?";
var answers = [{answer: "Sign", correct: 0}, {answer: "Bits in the frac field", correct: 0}, {answer: "Bits in the exp field", correct: 1}, {answer: "Normalization", correct: 0}]
var answerExplanation = "k gives the number bits in the exp field while n gives the number of bits in the frac field.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Student";
var question = "For all floating point numbers E = exp - Bias?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "False. For normalized values E = exp - Bias while for denormalized values E = 1 - Bias.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 352";
var ownerName = "Student";
var question = "In assembly LR stands for?";
var answers = [{answer: "Link Register", correct: 1}, {answer: "Label Routine", correct: 0}, {answer: "Last Routine", correct: 0}, {answer: "Label Register", correct: 0}]
var answerExplanation = "The link register (R14 or LR) stores the return address during a subroutine call.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 352";
var ownerName = "Student";
var question = "What is the hexadecimal for 1100000110100001?";
var answers = [{answer: "B8F4", correct: 0}, {answer: "C3E2", correct: 0}, {answer: "C1A1", correct: 1}]
var answerExplanation = "The correct answer is C1A1";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 352";
var ownerName = "Student";
var question = "If I am inside a subroutine and making a recursive call to this same subroutine,  it is ok to not worry about the LR as we are inside the same subroutine.  True or False";
var answers = [{answer: "False", correct: 1}, {answer: "True", correct: 0}]
var answerExplanation = "The correct answer is false";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 352";
var ownerName = "Student";
var question = "The top four bits of the PSR register contains ?";
var answers = [{answer: "N, Z K, X", correct: 0}, {answer: "N,Z X,V", correct: 0},{answer: "N,Z C,V", correct: 1}, {answer: "N, K, C,V", correct: 0}]
var answerExplanation = "The top four bits of the PSR register contains N,Z,C,V";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 352";
var ownerName = "Student";
var question = "Unsigned comparison is performed by which of the following?";
var answers = [{answer: "LT", correct: 0}, {answer: "LS", correct: 1},{answer: "LE", correct: 0}]
var answerExplanation = "LT and LE are for signed and LS is for unsigned";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 352";
var ownerName = "Student";
var question = "Which among these is not a basic type of branch?";
var answers = [{answer: "blm Rm", correct: 1}, {answer: "bl f", correct: 0},{answer: "blx Rm", correct: 0}, {answer: "b label", correct: 0}]
var answerExplanation = "blm Rm is not a a type of branch.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 352";
var ownerName = "Student";
var question = "Postconditions are things the procedure guarantees to be true on exit, provided the preconditions were met.";
var answers = [{answer: "False", correct: 0}, {answer: "True", correct: 1}]
var answerExplanation = "The correct answer is true";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 352";
var ownerName = "Student";
var question = "Which of the following is not a mechanism in procedures for machine level programming?";
var answers = [{answer: "Removing data", correct: 1}, {answer: "Passing control", correct: 0},{answer: "Memory management", correct: 0}]
var answerExplanation = "There is no such mechanism procedure as removing data, instead there is passing data";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);


// ENSE 374 COURSE QUESTIONS
var courseName = "ENSE 374";
var ownerName = "Roxanne";
var question = "Which of the following does not represent intellectual honesty?";
var answers = [{answer: "Admitting your mistakes", correct: 0}, {answer: "Clearly understanding your programs", correct: 0}, {answer: "Providing low estimates to make managers happy", correct: 1}, {answer: "Refusing to pretend to be an expert", correct: 0}]
var answerExplanation = "Do not underestimate when asked to estimate – the underestimate becomes reality.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "Once you finish your degree you know all you need to know about software?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "False. Knowledge is an expiring asset and as an engineer you should strive to be a life long learner.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "When taking on a new project where should you start?";
var answers = [{answer: "With the coding", correct: 0}, {answer: "With the planning", correct: 0}, {answer: "With the why", correct: 1}]
var answerExplanation = "Always start with the why. Why are you creating something, who are you creating it for and what benefit does it bring to users?";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "It is always a good idea to share your stakeholder analysis with everyone on the project, including stakeholders?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "False. Stakeholder analysis documents may contain opinions or descriptions that could offend stakeholders and make them unsupportive?";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "Risk planning is an important, often overlooked step in the project lifecycle?";
var answers = [{answer: "True", correct: 1}, {answer: "False", correct: 0}]
var answerExplanation = "If risks are not discussed and no response plan is created, teams may not be prepared to deal with unforseen events. This could cause significant project delays.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "Which design method is a linear approach to design and development?";
var answers = [{answer: "Waterfall", correct: 1}, {answer: "Agile", correct: 0}, {answer: "KANBAN", correct: 0}, {answer: "RUP", correct: 0}]
var answerExplanation = "Waterfall is a method that moves linearly through project stages and ensures one step is completed before moving on to anything else.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "Which of the following is not an aspect of empiricism?";
var answers = [{answer: "Transparency", correct: 0}, {answer: "Inspection", correct: 0}, {answer: "Rigidity", correct: 1}, {answer: "Adaptation", correct: 0}]
var answerExplanation = "Empiricism is an importany concept relating to the scrum framework that allows people to address complex adaptive problems. Rigidity does not apply.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "Which of the following does not describe scrum?";
var answers = [{answer: "Every month of the sprint", correct: 1}, {answer: "15 minute time box", correct: 0}, {answer: "24 hour team plans", correct: 0}, {answer: "Minimize interaction", correct: 0}]
var answerExplanation = "Daily scrums are meant to be short team meetings to quickly evaluate progress and plan the coming day.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "KANBAN is a method of what?";
var answers = [{answer: "Reflection", correct: 0}, {answer: "Visualization", correct: 1}, {answer: "Coding", correct: 0}]
var answerExplanation = "KANBAN is a just-in-time method of visualizing tasks left to be completed.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENSE 374";
var ownerName = "Student";
var question = "Refactoring is an unnecessary step in software development?";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "Software is often improved and refactored throughout a software's development to avoid software rot.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "In a communication/collaboration diagram, the order of user interaction is important to display";
var answers = [{answer: "True", correct: 1}, {answer: "False", correct: 0}]
var answerExplanation = "True, For example: Viewing a product on amazon is typically done after finding/searching it. Remember order is important";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "How many purpose each variable should be used for?";
var answers = [{answer: " atleast 1 time", correct: 0}, {answer: "only twice", correct: 0}, {answer: "exactly once", correct: 1}]
var answerExplanation = "Each variable should be used only for exactly one purpose";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "Detailed documentation (comments) nefore or after each code statement in a program is a sign of quality (clean) code";
var answers = [{answer: "Maybe", correct: 0}, {answer: "False", correct: 1}, {answer: "True", correct: 0}]
var answerExplanation = "False, Duplication is pointless";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "We should try to have low cohesion when creating classes";
var answers = [{answer: "True", correct: 0}, {answer: "False", correct: 1}]
var answerExplanation = "False, High cohesion: degree to which elements inside a function or class belong together";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "What type of coupling should we have between classes ?";
var answers = [{answer: "No coupling", correct: 0}, {answer: "Loose coupling", correct: 1}, {answer: "Strong coupling", correct: 0}]
var answerExplanation = "False, Our code will be less rigid.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "By following the open/close principle, our code will be rigid and as such, cleaner.";
var answers = [{answer: "No", correct: 1}, {answer: "Yes", correct: 0}, {answer: "Maybe", correct: 0}]
var answerExplanation = "False, Our code will be less rigid.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "Orthogonality is all about loose/low coupling?";
var answers = [{answer: "False", correct: 0}, {answer: "True", correct: 1}]
var answerExplanation = "True, Orthogonality is all about loose/low coupling.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "A large variable scope can make a program..?";
var answers = [{answer: "More prone to error", correct: 1}, {answer: "Less prone to error", correct: 0}, {answer: "Does not affect", correct: 0}]
var answerExplanation = "A large variable scope can make a program more prone to error";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "An MVC software application aims to provide an orthogonal structure between page content and its user interface";
var answers = [{answer: "True", correct: 1}, {answer: "False", correct: 0}]
var answerExplanation = "The statement is true.";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
var courseName = "ENEL 374";
var ownerName = "Student";
var question = "Should we strive to ensure every piece of knowledge has a single, clear representation within the system we create, or is that overkill ?";
var answers = [{answer: "No", correct: 0}, {answer: "Yes", correct: 1}, {answer: "Maybe", correct: 0}]
var answerExplanation = "Yes, this would lead to clean code";
await addQuestion(courseName, ownerName, question, answers, answerExplanation);
}
//UNCOMMENT TO RUN ADD QUESTIONS DB
addQuestions();