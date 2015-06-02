var login = require('./login'),
    signup = require('./signup'),
    facebook = require('./facebook-login'),
    User = require('../models/user'),
    google = require('./google-login'),
    pocket = require('./pocket-login');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });

    login(passport);
    signup(passport);
    facebook(passport);
    google(passport);
    pocket(passport);
};