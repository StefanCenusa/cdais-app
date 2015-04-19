var mongoose = require('mongoose');
var mongoose_thumbnail = require('mongoose-thumbnail');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    elevation: {type: Number, min: 0, max: 2, default: 2}, //0 admin, 1 trainer, 2 debater
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    phone: String,
    created_at: {type: Date, default: Date.now},
    socialMedia: [{
    	name: String,
    	url: String
    }],
    notifications: [{
    	type: {type: Number, default: 0},
    	text: String,
        created_at: Date,
    	read: Boolean
    }],
    debateHistory: [{
    	competitionID: Schema.Types.ObjectId,
    	name: String, //probabil doar de asta o sa avem nevoie in mod recurent
    	phase: {type: Number, default: 10, min: 0, max: 10}, //0 finala, 1 sferturi, 2 patrimi, 3 optimi, 4 saisprezecimi, 10 preliminarii
    	points:  [Number]
    }],
    judgeHistory: [{
        competitionID: Schema.Types.ObjectId,
        name: String, //probabil doar de asta o sa avem nevoie in mod recurent
        breaking: Boolean,
        position: String //CA , DCA
    }],
    learning: [{
        lessonID: Schema.Types.ObjectId,
        progress: Number
    }]
});

var competitionSchema = new mongoose.Schema({
    name: String,
    organiser: String,
    location: String,
    dateStart: Date,
    dateEnd: Date,
    regStart: Date,
    regEnd: Date
});

var groupSchema = new mongoose.Schema({
	name: String
});

var lessonSchema = new mongoose.Schema([{
	name: String,
	content: String,
	created_at: {type: Date, default: Date.now}
}]);

var blogPostSchema = new mongoose.Schema({
    content: String,
    created_at: {type: Date, default: Date.now},
    created_byID: String,
    created_byName: String
});

mongoose.model('User', userSchema);
mongoose.model('Competition', competitionSchema);
mongoose.model('Group', groupSchema);
mongoose.model('Lesson', lessonSchema);
mongoose.model('Lesson', blogPostSchema);