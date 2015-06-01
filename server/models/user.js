var mongoose = require('mongoose');

var thumbnailPluginLib = require('mongoose-thumbnail');
var thumbnailPlugin = thumbnailPluginLib.thumbnailPlugin;
var make_upload_to_model = thumbnailPluginLib.make_upload_to_model;

var path = require('path');
var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");


var userSchema = new mongoose.Schema({
    username: String,
    password: String, //stored as hash
    elevation: {type: Number, min: 0, max: 2, default: 2}, //0 admin, 1 trainer, 2 debater, 3 cp
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: {type: String, match: /(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})/},
    phone: {type: String, match: /\d{10}/},
    created_at: {type: Date, default: Date.now},
    socialMedia: [{
        id: String,
        url: String
    }],
    notifications: [{
        type: {type: Number, default: 0},
        text: String,
        created_at: {type: Date, default: Date.now},
        read: {type: Boolean, default: false}
    }],
    feedback: [{
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackFromTrainer'},
        read: {type: Boolean, default: false}
    }],
    //events: [{
    //    type: {type: mongoose.Schema.Types.ObjectID, ref: 'Event'},
    //    subscribe: {type: Boolean, default: false},
    //    notifications: {type: Boolean, default: false}
    //}],
    debateHistory: [{
        competitionID: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition'},
        name: String, //probabil doar de asta o sa avem nevoie in mod recurent
        phase: {type: Number, default: 10, min: 0, max: 10}, //0 finala, 1 sferturi, 2 patrimi, 3 optimi, 4 saisprezecimi, 10 preliminarii
        points:  [Number]
    }],
    judgeHistory: [{
        competitionID: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition'},
        name: String, //probabil doar de asta o sa avem nevoie in mod recurent
        breaking: Boolean,
        position: String //CA , DCA
    }],
    learning: [{
        lessonID: {type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'},
        progress: Number
    }]
});

userSchema.plugin(thumbnailPlugin, {
    name: "photo",
    format: "png",
    size: 80,
    inline: false,
    save: true,
    upload_to: make_upload_to_model(uploads, 'photos'),
    relative_to: uploads_base
});

module.exports = mongoose.model('User', userSchema);