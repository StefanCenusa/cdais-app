var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* Handle Login POST */
	router.post('/login', function(req, res){
        passport.authenticate('login', {
            successRedirect: res.status(200).send('logged in!'),
            failureRedirect: '/',
            failureFlash : true
        })
    });

	/* Handle Registration POST */
	router.post('/signup', function(req, res){
        passport.authenticate('signup', {
            successRedirect: res.status(200).send('siggned up!'),
            failureRedirect: res.status(500).send('fail to signup in!'),
            failureFlash : true
        })
    });

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
        res.status(200).send('logged out!');
	});

	return router;
}





