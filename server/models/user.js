var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
    meta: {
        notifications: [
            {
                notType: String,
                message: String,
                timestamp: Date,
                read: Boolean
            }
        ],
        facebookId: String,
        googleId: String
    }
});