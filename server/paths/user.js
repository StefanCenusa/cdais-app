var User = require('../models/user');

module.exports.hello = function (request, response, callback) {
    var r = {"text": "r is the result of process data"};
    var username = request.params.username;
    // r is the result of process data
    callback(null, username);
};

module.exports.getUser = function (request, response, callback) {
    if (request.params.hasOwnProperty('username')) {
        User.findOne({'username': request.params.username}, function (err, user) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, user);
            }
        })
    }

};

module.exports.getNotifications = function (request, response, callback) {
    var url = require('url');
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    if (query.hasOwnProperty('username')) {
        var username = query.username;
        User.findOne({'username': username}, function (err, user) {
            if (err) {
                callback(err, null);
            }
            if (!user) {
                return callback("Wrong user", null);
            }
            else {
                var not = user.notifications;
                if (query.hasOwnProperty('unread') && query.unread == 'true') {
                    //the method will return the unread notifications only
                    var unreadNot = [];
                    for (var i = not.length - 1; i >= 0; i--) {
                        var item = not[i];
                        if (!item.read) {
                            unreadNot.push(item);
                        }
                    }
                    callback(null, unreadNot);
                }
                else {
                    if (query.hasOwnProperty('readall') && query.readall == 'true'){
                        for (var i = user.notifications.length - 1; i >= 0; i--) {
                            var item = user.notifications[i];
                            if (!item.read) {
                                user.notifications[i].read = true;
                            }
                        }
                        user.save(function (err) {
                            if (err) {
                                return callback(err, null);
                            }
                            return callback(null, user.notifications);
                        });
                    }
                    else{
                        callback(null, user.notifications);
                    }
                }
            }
        });
    }

};