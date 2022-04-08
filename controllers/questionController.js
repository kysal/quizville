const express = require('express');
var router = express.Router();
const Question = require('../models/question');

const ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newQuestion = new Question.Question(req.body);
    Question.addQuestion(newQuestion, (err) => {
        if (err) {
            res.json({success: false, msg: err})
        } else {
            res.json({success: true})
        }
    })
})

router.get('/userlist/:uid', (req, res) => {
    Question.getQuestionBank(req.params.uid, (err, doc) => {
        if (!err) {
            let bank = [];
            doc.forEach(element => {
                bank.push(element._id);
            });
            res.send(bank);
        } else {
            console.log("Error in Retrieving Question Bank: " + JSON.stringify(err, undefined, 2))
        }
    })
})

router.get('/:questId', (req, res) => {
    Question.getQuestionById(req.params.questId, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error in Retrieving Question: " + JSON.stringify(err, undefined, 2))
        }
    })
})

router.delete('/:uid/:questId', (req, res) => {
    Question.deleteQuestion(req.params.questId, req.params.uid, (err) => {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    })
})

module.exports = router;