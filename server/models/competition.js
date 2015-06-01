var mongoose = require('mongoose');

var competitionSchema = new mongoose.Schema({
    name: String,
    organiser: String,
    location: String,
    dateStart: Date,
    dateEnd: Date,
    registrationStart: Date,
    registrationEnd: Date
});

module.exports = mongoose.model('Competition', competitionSchema);
