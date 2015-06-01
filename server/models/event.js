var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    title: String,
    location: String,
    start: {type: Date, default: Date.now},
    end: {type: Date, default: Date.now},
    allDay: {type: Boolean, default: true},
    participants: [{
        type: mongoose.Schema.Types.ObjectID, ref: 'User'
    }]
});

module.exports = mongoose.model('Event', eventSchema);
