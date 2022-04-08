const mongoose = require('mongoose');
const User = require('./user');
const schemas = require('./schemas');
var ObjectId = require('mongoose').Types.ObjectId;

const Report = mongoose.model('Report', schemas.ReportSchema);
module.exports = {Report: Report};

module.exports.addReport = function(newReport, callback) {
    User.getUserById(newReport.uid, (err, user) => {
        if (err) throw err;
        newReport.save((err, data) => {
            user.reports.push(data._id);
            user.save()
            callback(err, data);
        })
    })
}

module.exports.getReportById = function(id, callback) {
    Report.findById(id, callback)
}

module.exports.getUserReportList = function(userId, callback) {
    User.getUserById(userId, (err, user) => {
        callback(err, user.reports);
    })
}
