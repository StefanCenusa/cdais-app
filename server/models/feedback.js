var mongoose = require('mongoose');

var feedbackFromTrainerSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    trainer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    position: String,
    score: Number,
    feedback: String
});
var feedbackFromDebaterSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    debater: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    feedback: [
        {
            style: {type: Number, default: 0}
        },
        {
            strategy: {type: Number, default: 0}
        },
        {
            content: {type: Number, default: 0}
        },
        {
            learning: {type: Number, default: 0}
        },
        {
            suggestion: String
        }
    ]
});

module.exports = mongoose.model('FeedbackFromTrainer', feedbackFromTrainerSchema);
module.exports = mongoose.model('FeedbackFromDebater', feedbackFromDebaterSchema);