const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const config = require('./db');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        

        return done(null, jwt_payload.user);

        // User.getUserById(jwt_payload.user._id), (err, user) => {

        //     console.log("USER: " + user);
        //     if (err) {
        //         return done(err, false);
        //     }

        //     if (user) {
        //         return done(null, user);
        //     } else {
        //         return done(null, false);
        //     }

        // };
    }))
}