var User = require('../models/user');

module.exports.hello = function (paramas, callback) {
    var r = {"text": "r is the result of process data"};
    // r is the result of process data
    callback(null, r);

};

module.exports.getNotifications = function (params, callback) {
    var r = [];
    var username = params[0];
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