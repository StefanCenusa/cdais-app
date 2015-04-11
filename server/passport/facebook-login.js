var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function(passport){
    passport.use(new FacebookStrategy({
            clientID: "751825981605500",
            clientSecret: "5c0300813077f6e4d18d28ff8704184f",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ 'username' :  profile.name.givenName }, function(err, user) {
                if (err) { return done(err); }
                done(null, user);
            });
        }
    ));
}