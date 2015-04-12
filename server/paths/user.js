var tokenAuth = require('.././tokenAuth');
var User = require('../models/user');

module.exports.hello = function (params, callback) {
    tokenAuth(params, function(err, result){
        if (err){
            callback(err, result);
        }
        else{
            //do your job
            var r={ "text": "r is the result of process data"};
            // r is the result of process data
            callback(null, params[0]);
        }

    });
};

module.exports.getNotifications = function(params, callback){
    tokenAuth(params, function(err, result){
        if (err){
            callback(err, result);
        }
        else{
            var r=[];
            var username = result.decoded.username;
            // find a user in Mongo with provided username
            User.findOne({ 'username' :  username }, function(err, user) {
                // In case of any error
                if (err){
                    console.log('Error in getting notifications: '+err);
                    callback(err, r);
                }
                // doesn't exists
                if (!user) {
                    console.log('User does not exists with username: '+username);
                    return callback("Wrong user", r);
                } else {
                    callback(null, user.meta.notifications);
                }
            });
        }
    });
};