const mongoose = require('mongoose');
const User = require('./user');
const schemas = require('./schemas')
const ObjectId = require('mongoose').Types.ObjectId


//console.log(QuizSchema);

const Quiz = mongoose.model('Quiz', schemas.QuizSchema);
module.exports = {Quiz: Quiz};

module.exports.addQuiz = function(newQuiz, callback) {
    User.getUserById(newQuiz.uid, (err, user) => {
        if (err) throw err;
        newQuiz.save((err, data) => {
             user.quizzes.push(data._id);
             user.save((err, data) => {});
             callback(err, data);
        })
    }) 
}

module.exports.getQuizById = function(id, callback) {
    Quiz.findById(id, callback);
}

module.exports.getQuizzesFromUser = function(userId, callback) {
    User.getUserById(userId, (err, user) => {
        callback(err, user.quizzes);
    })
}

module.exports.deleteQuiz = function(quizId, uid, callback) {
    User.getUserById(uid, (err, user) => {
        if (err) throw err;
        let index = user.quizzes.indexOf(new ObjectId(quizId));
        if (index > -1) {
            user.quizzes.splice(index, 1);
            user.save()
            this.getQuizById(quizId, (err, quiz) => {
                quiz.remove();
                callback(err)
            })
        } else {
            callback(new Error())
        }
    })
}

module.exports.importQuiz = function(quiz, targetUserId, callback) {
    quiz.save((err, quizData) => {
        if (err) throw err;
        User.getUserById(targetUserId, (err, user) => {
            user.quizzes.push(quizData._id);
            user.save();
            callback(err)
        })
    })
}

