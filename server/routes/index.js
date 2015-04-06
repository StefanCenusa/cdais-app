var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function (passport) {

    /* Handle Login POST */
    router.post('/login', function(req, res){
        passport.authenticate('login', function(err, user, info){
            if (err) return res.send(err);
            if (!user)
                return res.send(info);
            req.logIn(user, function (err){
                if (err) return res.send(err);
                return res.send('OK!');
            })
        })(req, res);
    });

    /* Handle Registration POST */
    router.post('/signup', function(req, res) {
        passport.authenticate('signup', function (err, user, info) {
            if (err) return res.send(err);
            if (!user)
                return res.send(info);
            req.logIn(user, function (err) {
                if (err) return res.send(err);
                return res.send('OK!');
            })
        })(req, res);
    });

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}





