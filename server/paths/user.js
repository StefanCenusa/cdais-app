var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
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

    var username = request.params.username;
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

};

module.exports.addDebateHistory = function (request, response, callback) {
    var username = request.params.username;
    var data = request.body;
    var query = {'username': username};
    var newDebateCompetition = {};
    newDebateCompetition.competitionID = data.competitionID;
    newDebateCompetition.phase = data.phase;
    newDebateCompetition.speakerPoints = data.speakerPoints;
    newDebateCompetition.teamPoints = data.teamPoints;
    User.findOne(query, function (err, user) {
        if (err) {
            callback(err, null);
        }
        if (!user) {
            return callback("Wrong user", null);
        } else {
            User.findOne({debateHistory: {$elemMatch: {competitionID: new ObjectId(newDebateCompetition.competitionID)}}}, function (err, result) {
                if (err)
                    callback(err, null);
                if (!result) {
                    var update = {$push: {debateHistory: newDebateCompetition}};
                    User.update(query, update, {}, function (err, updated) {
                        if (err) {
                            console.log('Error in saving debate history: ' + err);
                            return callback(err, null);
                        }
                        console.log('Debate history saved successfully');
                        return callback(null, newDebateCompetition);
                    })
                }
                else {
                    query = {
                        'username': username,
                        debateHistory: {$elemMatch: {competitionID: new ObjectId(newDebateCompetition.competitionID)}}
                    };
                    var update = {$set: {"debateHistory.$": newDebateCompetition}};
                    User.update(query, update, {}, function (err, updated) {
                        if (err) {
                            console.log('Error in saving debate history: ' + err);
                            return callback(err, null);
                        }
                        console.log('Debate history updated successfully');
                        return callback(null, newDebateCompetition);
                    })
                }
            })
        }
    })
};