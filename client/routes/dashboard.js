var express = require('express');
var router = express.Router();

var data = require("../data.js")

/* GET dashboard home page. */
router.get('/', function (req, res, next) {
    res.render('dashboard', data);
});

module.exports = router;
