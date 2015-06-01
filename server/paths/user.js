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

//TODO de citit marcat ca citite notificarile

module.exports.getNotifications = function (request, response, callback) {
    var url = require('url');
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    if(query.hasOwnProperty('username')){
        var username = query.username;
        User.findOne({'username': username}, function (err, user) {
            if (err) {
                callback(err, null);
            }
            if (!user) {
                return callback("Wrong user", null);
            } else {
                callback(null, user.notifications);
            }
        });
    }
    if(query.hasOwnProperty('id')){
        var id = query.id;
        User.findOne({'_id': id}, function (err, user) {
            if (err) {
                callback(err, null);
            }
            if (!user) {
                return callback("Wrong user", null);
            } else {
                callback(null, user.notifications);
            }
        });
    }

};