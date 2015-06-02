var Competition = require('../models/competition'),
    User = require('../models/user'),
    async = require('async');

module.exports.addCompetition = function (request, response, callback){
    var newCompetition = new Competition();
    var data = request.body;
    newCompetition.name = data.name;
    newCompetition.organiser = data.organiser;
    newCompetition.location = data.location;
    newCompetition.dateStart = data.dateStart;
    newCompetition.dateEnd = data.dateEnd;
    newCompetition.registrationStart = data.registrationStart;
    newCompetition.registrationEnd = data.registrationEnd;

    newCompetition.save(function (err) {
        if (err) {
            console.log('Error in saving Competition: ' + err);
            return callback(err, null);
        }
        console.log('Competition saved succesfully');
        return callback(null, newCompetition);
    });
};

module.exports.getCompetitions = function (request, response, callback){
    Competition.find({}, (function(err, competitions){
        if (err) {
            return callback(err, null);
        }
        return callback(null, competitions);
    }))
};