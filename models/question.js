const mongoose = require('mongoose');
const User = require('./user');
const schemas = require('./schemas');
const ObjectId = require('mongoose').Types.ObjectId;

const Question = mongoose.model('Question', schemas.QuestionSchema);
module.exports = {Question: Question};

module.exports.addQuestion = function(newQuestion, callback) {
    User.getUserById(newQuestion.creator, (err, user) => {
        if (err) throw err;
        newQuestion.save((err, data) => {
            user.questions.push(data._id);
            user.save();
            callback(err);
        })
    })

}

module.exports.getQuestionById = function(id, callback) {
    Question.findById(id, callback);
}

module.exports.getQuestionBank = function(uid, callback) {
    User.getUserById(uid, (err, user) => {
        callback(err, user.questions);
    })
}

module.exports.importQuestion = function(question, targetUserId, callback) {
    question.save((err, qData) => {
        if (err) throw err;
        User.getUserById(targetUserId, (err, user) => {
            user.questions.push(qData._id);
            user.save();
            callback(err)
        });
    });
}

module.exports.deleteQuestion = function(qid, uid, callback) {
    User.getUserById(uid, (err, user) => {
        if (err) throw err;
        let index = user.questions.indexOf(new ObjectId(qid));
        if (index > -1) {
            user.questions.splice(index, 1);
            user.save();
            this.getQuestionById(qid, (err, question) => {
                question.remove()
                callback(err)
            })
        } else {
            callback(new Error())
        }
    })
    
}