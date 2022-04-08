const express = require('express');
const { PublicQuiz } = require('../models/public');
var router = express.Router();
const Public = require('../models/public');
const Quiz = require('../models/quiz')

router.post('/import', (req, res) => {
    let newQuiz = new Quiz.Quiz(req.body.quiz);
    Quiz.importQuiz(newQuiz, req.body.userId, (err) => {
        if (err) {
            console.log(JSON.stringify(err, undefined, 2))
            res.json({success: false, msg: err});
        } else {
            res.json({success: true});
        }
    })
});

router.get('/list', (req, res) => {
    Public.quizList((err, doc) => {
        if (err) throw err;
        res.send(doc);
    })
});

router.post('/', (req, res) => {
    Public.publishQuiz(req.body._id, (err) => {
        if (err) {
            console.log(JSON.stringify(err, undefined, 2))
            res.json({success: false, msg: err});
        } else {
            res.json({success: true});
        }
    })
})

router.delete('/:quizId', (req, res) => {
    PublicQuiz.findByIdAndDelete(req.params.quizId, (err, data) => {
        if (err) {
            res.json({success: false, msg: JSON.stringify(err, undefined, 2)})
        } else {
            res.json({success: true});
        }
    })
})

module.exports = router;