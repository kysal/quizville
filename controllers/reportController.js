const express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const passport = require('passport');
const  Quiz = require('../models/quiz');

const Report = require('../models/report');

router.post('/add', (req, res, next) => {
    let newReport = new Report.Report(req.body);
    newReport.postDate = new Date(Date.now());
    Report.addReport(newReport, (err, data) => {
        if (!err) {
            console.log("Sending data: " + data)
            res.send(data); 
        } else {
            console.log("Error in adding report: " + JSON.stringify(err, undefined, 2));
        }
    })
    console.log("Finished function")
})

router.get('/list/:uid', (req, res) => {
    Report.getUserReportList(req.params.uid, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error in Retrieving Reports: " + JSON.stringify(err, undefined, 2))
        }
    })
})

router.get('/brief/:reportId', (req, res) => {
    Report.getReportById(req.params.reportId, (err, report) => {
        if (!err) {
            Quiz.getQuizById(report.qid, (err, quiz) => {
                if (!err) {
                    res.send({
                        _id: report._id,
                        title: quiz.title,
                        postDate: report.postDate,
                        marksAwarded: report.marksAwarded,
                        marksAvailable: report.marksAvailable
                    })
                } else {
                    console.log("Error in Retrieving Quiz: " + JSON.stringify(err, undefined, 2))
                } 
            })
        } else {
            console.log("Error in Retrieving Reports: " + JSON.stringify(err, undefined, 2))
        }
    })
})


router.get('/:reportId', (req, res) => {
    Report.getReportById(req.params.reportId, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else { console.log("Error in Retrieving Report: " + JSON.stringify(err, undefined, 2))}
    })
})


module.exports = router;