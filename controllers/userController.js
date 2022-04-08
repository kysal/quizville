const express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const passport = require('passport');
const config = require('../db');

const User = require('../models/user');

router.post('/register', (req, res, next) => {
    let newUser = new User.User({
        username: req.body.username,
        password: req.body.password,
        quizzes: [],
        reports: [],
        questions: []
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    })
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({success: false, msg: 'User not found'})

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        })
    })

    

});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log("hello world")
    res.json({user: req.user});
});

router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});

router.get('/username/:id', (req, res) => {
    User.getUsernameFromUserId(req.params.id, (err, username) => {
        if (!err) { res.send({username: username}); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
})


router.get('/', (req, res) => {
    User.User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Users : ' + JSON.stringify(err, undefined, 2)); }
    });
})

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});



// router.post('/', (req, res) => {
//     var user = new User({
//         username: req.body.username,
//         password: req.body.password
//     });
//     user.save((err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

// router.put('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
//     var user = {
//         username: req.body.username,
//         password: req.body.password
//     };
//     User.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

// router.delete('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
//     User.findByIdAndRemove(req.params.id, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
//     });
// });



module.exports = router;