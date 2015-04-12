var jwt = require('jsonwebtoken');

module.exports = function (token, callback) {
    if (token) {
        jwt.verify(token, env.superSecret, function (err, decoded) {
            if (err) {
                callback(err, "Failed to authenticate token.");
            } else {
                var username = decoded;
                callback(null, username);
            }
        });
    }
    else {
        callback(err, "Accest forbidden");
    }
};