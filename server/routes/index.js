var express = require('express');
var passport = require('passport');
var Account = require('../auth/account-model');
var router = express.Router();


//router.get('/', function (req, res) {
//  res.render('index', { user : req.user });
//});

//router.get('/register', function(req, res) {
//  res.render('register', { });
//});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render("register", {info: "Sorry. That username already exists. Try again."});
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});


//router.get('/login', function(req, res) {
//  res.render('login', { user : req.user });
//});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.status(200).send("logged in!");
});

router.get('/logout', function(req, res) {
  req.logout();
    res.status(200).send("logged out!");
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;
