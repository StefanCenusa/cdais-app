var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
                passReqToCallback: true
            },
            function (req, username, password, done) {
                User.findOne({'username': username},
                    function (err, user) {
                        if (err)
                            return done(err);
                        if (!user) {
                            console.log('User Not Found with username ' + username);
                            return done(null, false, 'User Not found');
                        }
                        if (!isValidPassword(user, password)) {
                            console.log('Invalid Password');
                            return done(null, false, 'Invalid Password'); // redirect back to login page
                        }
                        return done(null, user);
                    }
                );

            })
    );

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

};