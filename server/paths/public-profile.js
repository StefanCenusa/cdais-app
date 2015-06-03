var User = require('../models/user');
var userService = require('./user');

module.exports.getPublicProfile = function (request, response, callback){
    userService.getUser(request, response, callback);
};