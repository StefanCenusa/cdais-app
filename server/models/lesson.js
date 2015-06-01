var mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema([{
    name: String,
    content: String,
    created_at: {type: Date, default: Date.now}
}]);

module.exports = mongoose.model('Lesson', lessonSchema);
