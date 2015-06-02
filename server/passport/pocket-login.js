var PocketStrategy = require('passport-pocket'),
    User = require('../models/user');
const POCKET_CONSUMER_KEY = "41849-95da1c8e22f66420d41665e7";

// Passport Set up
module.exports = function (passport) {
    passport.use(new PocketStrategy({
            consumerKey: POCKET_CONSUMER_KEY,
            callbackURL: "http://127.0.0.1:3000/auth/pocket/callback"
        }, function (username, accessToken, done) {
            process.nextTick(function () {
                return done(null, {
                    username: username,
                    accessToken: accessToken
                });
            });
        }
    ))
};