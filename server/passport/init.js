var login = require('./login');
var signup = require('./signup');
var facebook = require('./facebook-login');
var User = require('../models/user');
var google = require('./google-login');

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
};