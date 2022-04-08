const express = require('express');
const { PublicQuestion } = require('../models/public');
var router = express.Router();
const Public = require('../models/public');
const  Question = require('../models/question');


router.post('/import', (req, res) => {
    let newQuestion = new Question.Question(req.body.question);
    Question.importQuestion(newQuestion, req.body.userId, (err) => {
        if (err) {
            res.json({success: false, msg: JSON.stringify(err, undefined, 2)});
        } else {
            res.json({success: true});
        }
    })
})

router.get('/list', (req, res, next) => {
    Public.questionList((err, doc) => {
        if (err) throw err;
        res.send(doc);
    })
})

router.post('/', (req, res, next) => {
    Public.publishQuestion(req.body._id, (err) => {
        if (err) {
            console.log(JSON.stringify(err, undefined, 2))
            res.json({success: false, msg: err});
        } else {
            res.json({success: true});
        }
    })
});

router.delete('/:questionId', (req, res) => {
    PublicQuestion.findByIdAndDelete(req.params.questionId, (err, data) => {
        if (err) {
            res.json({success: false, msg: JSON.stringify(err, undefined, 2)})
        } else {
            res.json({success: true});
        }
    })
})

 
module.exports = router;