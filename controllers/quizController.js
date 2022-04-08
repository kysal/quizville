const express = require('express');
var router = express.Router();
const passport = require('passport');
const Quiz = require('../models/quiz');
const { UserSchema } = require('../models/schemas');
var ObjectId = require('mongoose').Types.ObjectId;
const Question = require('../models/question');

router.post('/create', (req, res, next) => {

    req.body.questions.forEach(element => {
        if (element.addToQB) {
            element.creator = req.body.uid
            Question.addQuestion(new Question.Question(element), (err) => {
                console.log("Element")
                if (err) throw err;
            });
        }
    });
    let newQuiz = new Quiz.Quiz(req.body);
    Quiz.addQuiz(newQuiz, (err, data) => {
        if (err) {
            res.json({success: false, msg: err});
        } else {
            res.json({success: true});
        }
    })

})

router.get('/:quizId', (req, res) => {
    Quiz.getQuizById(req.params.quizId, (err, doc) => {
        if (!err) { 
            res.send(doc); }
        else { console.log("Error in Retrieving Quiz: " + JSON.stringify(err, undefined, 2))}
    })
})

router.get('/quizDisplay/:quizId', (req, res) => {
    Quiz.getQuizById(req.params.quizId, (err, doc) => {
        if (!err) {
            res.send({
                _id: doc._id,
                title: doc.title,
                questLen: doc.questions.length
            }); }
        else { console.log("Error in Retrieving Quiz: " + JSON.stringify(err, undefined, 2))}
    })
})

router.get('/user/:uid', (req, res) => {
    Quiz.getQuizzesFromUser(req.params.uid, (err, doc) => {
        if (!err) { 
            res.send(doc); }
        else { console.log("Error in Retrieving Quiz: " + JSON.stringify(err, undefined, 2))}
    })
})

router.get('/quizList/:uid', (req, res) => {
    Quiz.getQuizzesFromUser(req.params.uid, (err, doc) => {
        if (!err) { 
            let quizListDetails = [];
            res.send(doc); 
        }
        else { console.log("Error in Retrieving Quiz: " + JSON.stringify(err, undefined, 2))}
    })
})

router.delete('/:uid/:quizId', (req, res) => {
    Quiz.deleteQuiz(req.params.quizId, req.params.uid, (err) => {
        if (!err) {
            res.json({success: true});
        } else {
            console.log("Error in deleting quiz: " + JSON.stringify(err, undefined, 2))
            res.json({success: false});
        }
    })
})

module.exports = router;
