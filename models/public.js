const mongoose = require('mongoose');
const User = require('./user');
const schemas = require('./schemas');
const Question = require('./question');
const Quiz = require('./quiz')

const PublicQuestion = mongoose.model('Public Question', schemas.QuestionSchema);
const PublicQuiz = mongoose.model('Public Quiz', schemas.QuizSchema)
module.exports = {
    PublicQuestion: PublicQuestion,
    PublicQuiz: PublicQuiz
}

module.exports.publishQuestion = function(questionId, callback) {
    Question.getQuestionById(questionId, (err, question) => {
        if (err) throw err;
        console.log(question)
        let newPublicQuestion = new PublicQuestion(question.toObject());
        newPublicQuestion.save((err, data) => {
            question.public = true;
            question.save()
            callback(err);
        });
    });
}

module.exports.questionList = function(callback) {
    PublicQuestion.find((err, questions) => {
        if (err) throw err;
        callback(err, questions)
    })
}

module.exports.publishQuiz = function(quizId, callback) {
    Quiz.getQuizById(quizId, (err, quiz) => {
        if (err) throw err;
        let newPublicQuiz = new PublicQuiz(quiz.toObject());
        newPublicQuiz.save((err, data) => {
            quiz.public = true;
            quiz.save();
            callback(err);
        })
    })
}

module.exports.quizList = function(callback) {
    PublicQuiz.find((err, quizzes) => {
        if (err) throw err;
        callback(err, quizzes);
    })
}