var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    name: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []}],
    trainers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []}],
    filepath: String
});

module.exports = mongoose.model('Group', groupSchema);