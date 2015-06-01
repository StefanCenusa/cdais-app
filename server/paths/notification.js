var Group = require('../models/group'),
    User = require('../models/user'),
    async = require('async');

module.exports.sendNotification = function (request, response, callback) {
    var data = request.body;

    if (!data.hasOwnProperty('group') || typeof data.group != 'string') {
        callback('Invalid or insufficient params', null);
    }

    var groupId = data.group;
    var notificationData;
    if (!data.hasOwnProperty('notification'))
        notificationData = {};
    else {
        notificationData = data.notification;
    }

    var send = function (userId, cb) {
        User.findOne({'_id': userId}, function (err, user) {
            if (err) {
                cb(err, null);
            }
            else {
                if (!notificationData.hasOwnProperty('created_at'))
                    notificationData.created_at = Date.now();
                if (!notificationData.hasOwnProperty('read'))
                    notificationData.read = false;
                if (!notificationData.hasOwnProperty('text'))
                    notificationData.text = '';
                user.notifications.push(notificationData);
                user.save(function (err) {
                    if (err) {
                        return cb(err, null);
                    }
                    return cb(null, null);
                });
            }
        });
    };

    Group.findOne({'_id': groupId}, function (err, group) {
        if (err) {
            callback(err, null);
        }
        else {
            var members = group.members;
            var trainers = group.trainers;
            async.each(members, send, function (err) {
                async.each(trainers, send, function (err) {
                    callback(err, null);
                });
            });
        }
    })
};