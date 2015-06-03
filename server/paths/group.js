var Group = require('../models/group');

module.exports.createGroup = function (request, response, callback) {

    if (!request.body.hasOwnProperty('name') || typeof request.body.name != 'string') {
        callback('Invalid or insufficient params', null);
    }
    else {
        Group.findOne({'name': request.body.name}, function (err, group) {
            if (err) {
                callback(err, null);
            }
            if (group) {
                callback('Group already exists!', null);
            }
            else {
                var newGroup = new Group();
                if (request.body.hasOwnProperty('name') && typeof request.body.name === 'string') {
                    newGroup.name = request.body.name;
                }
                if (request.body.hasOwnProperty('members') && Array.isArray(request.body.members)) {
                    newGroup.members = request.body.members;
                }
                if (request.body.hasOwnProperty('trainers') && Array.isArray(request.body.trainers)) {
                    newGroup.trainers = request.body.trainers;
                }
                if (request.body.hasOwnProperty('filepath') && typeof request.body.filepath === 'string') {
                    newGroup.filepath = request.body.filepath;
                }
                newGroup.save(function (err) {
                    if (err) {
                        console.log('Group in saving blogpost: ' + err);
                        return callback(err, null);
                    }
                    console.log('Group saved succesfully');
                    return callback(null, newGroup);
                });
            }
        })
    }
    ;

    module.exports.getGroup = function (request, response, callback) {
        var url = require('url');
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;

        if (query.hasOwnProperty('name')) {
            var groupName = query.name;
            Group.findOne({'name': groupName}, function (err, group) {
                if (err) {
                    callback(err, null);
                }
                if (group) {
                    callback(null, group);
                }
                else {
                    callback('No group was found', null);
                }
            })
        }
        else {
            Group.find().exec(function (err, arr) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(null, arr);
                }
            })
        }
    }
};

module.exports.updateGroup = function (request, response, callback) {
    if (!request.body.hasOwnProperty('_id') || typeof request.body._id != 'string') {
        callback('Invalid or insufficient params', null);
    }
    else {

        Group.findOne({'_id': request.body._id}, function (err, group) {
            if (err) {
                callback(err, null);
            }
            if (group) {
                if (request.body.hasOwnProperty('name') && typeof request.body.name === 'string') {
                    group.name = request.body.name;
                }
                if (request.body.hasOwnProperty('members') && Array.isArray(request.body.members)) {
                    group.members = request.body.members;
                }
                if (request.body.hasOwnProperty('trainers') && Array.isArray(request.body.trainers)) {
                    group.trainers = request.body.trainers;
                }
                if (request.body.hasOwnProperty('filepath') && typeof request.body.filepath === 'string') {
                    group.filepath = request.body.filepath;
                }
                group.save(function (err) {
                    if (err) {
                        console.log('Group in saving blogpost: ' + err);
                        return callback(err, null);
                    }
                    console.log('Group saved succesfully');
                    return callback(null, group);
                });
            }
            else {
                callback('No group was found', null);
            }
        });
    }
};

module.exports.deleteGroup = function (request, response, callback) {
    if (!request.body.hasOwnProperty('_id') || typeof request.body._id != 'string') {
        callback('Invalid or insufficient params', null);
    }
    else {
        Group.findOneAndRemove({'_id': request.body._id}, function (err) {
            callback(err, null);
        });
    }
};