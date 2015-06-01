var User = require('../models/user');

module.exports.hello = function (request, response, callback) {
    var r = {"text": "r is the result of process data"};
    var username = request.params.username;
    // r is the result of process data
    callback(null, username);
};

module.exports.getUserById = function (request, response, callback){
    var url = require('url');
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    if (query.hasOwnProperty('id')){
        User.findOne({'_id': query.id}, function(err, user){
            if (err){
                callback(err,null);
            }
            else{
                callback(null,user);
            }
        })
    }

};

module.exports.getNotifications = function (request, response, callback) {
    var r = [];
    var username = request.params.username;
    User.findOne({'username': username}, function (err, user) {
        if (err) {
            console.log('Error in getting notifications: ' + err);
            callback(err, r);
        }
        if (!user) {
            console.log('User does not exists with username: ' + username);
            return callback("Wrong user", r);
        } else {
            callback(null, user.meta.notifications);
        }
    });
};