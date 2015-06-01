var mongoose = require('mongoose');

var feedbackFromTrainerSchema = new mongoose.Schema({
    name: String
});

var feedbackFromDebaterSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('FeedbackFromTrainer', feedbackFromTrainerSchema);
module.exports = mongoose.model('FeedbackFromDebater', feedbackFromDebaterSchema);
