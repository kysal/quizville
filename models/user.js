const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schemas = require('./schemas');

const User = mongoose.model('User', schemas.UserSchema);
//const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = {User: User}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    console.log(candidatePassword);
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    }); 
}

module.exports.getUsernameFromUserId = function(userid, callback) {
    User.findById(userid, (err, user) => {
        callback(err, user.username);
    })
}