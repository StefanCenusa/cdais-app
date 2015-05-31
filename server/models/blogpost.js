var mongoose = require('mongoose');


var blogPostSchema = new mongoose.Schema({
    title: String,
    photo: String,
    content: String,
    created_at: {type: Date, default: Date.now},
    created_byID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('BlogPost', blogPostSchema);