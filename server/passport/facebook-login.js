var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
            clientID: "751825981605500",
            clientSecret: "5c0300813077f6e4d18d28ff8704184f",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            profile = profile._json;
            User.findOne({'meta.facebookId': profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    var newUser = new User();

                    var username = profile.first_name + profile.last_name;
                    newUser.meta.facebookId = profile.id;
                    newUser.username = username;
                    newUser.firstName = profile.first_name;
                    newUser.lastName = profile.last_name;

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