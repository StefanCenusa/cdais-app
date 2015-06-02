var GoogleStrategy = require('passport-google').Strategy,
    User = require('../models/user');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
            returnURL: 'http://localhost:3000/auth/google/return',
            realm: 'http://localhost:3000/auth/google/return'
        },
        //TODO: save accessToken
        function (identifier, profile, done) {
            User.findOne({'meta.googleId': identifier}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    var newUser = new User();

                    var username = profile.name.givenName + profile.name.familyName;
                    newUser.meta.googleId = identifier;
                    newUser.username = username;
                    newUser.email = profile.emails[0].value;
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.lastName;

                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            return done(err, null);
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
                else done(null, user);
            });
        }
    ));
};