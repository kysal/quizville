const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
var userController = require('./controllers/userController.js')
var quizController = require('./controllers/quizController')
var reportController = require('./controllers/reportController')
var questionController = require('./controllers/questionController')
var publicQuestionController = require('./controllers/publicQuestionController')
var publicQuizController = require('./controllers/publicQuizController');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');


var app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server started at port: ' + port));
app.use(session({
    secret: 'yoursecret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

require('./passport')(passport);

app.use('/quiz', quizController);
app.use('/users', userController);
app.use('/report', reportController);
app.use('/question', questionController);
app.use('/public/question', publicQuestionController);
app.use('/public/quiz', publicQuizController);
