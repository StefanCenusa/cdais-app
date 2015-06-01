var User = require('../models/user');

module.exports.hello = function (request, response, callback) {
    var r = {"text": "r is the result of process data"};
    var username = request.params.username;
    // r is the result of process data
    callback(null, username);
};

module.exports.getUser = function (request, response, callback){
    if (request.params.hasOwnProperty('username')){
        User.findOne({'username': request.params.username}, function(err, user){
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