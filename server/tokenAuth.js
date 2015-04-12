var jwt = require('jsonwebtoken');

module.exports = function (req, callback) {
    var token = req[0];
    if (token) {
        jwt.verify(token, env.superSecret, function (err, decoded) {
            if (err) {
                callback(err, "Failed to authenticate token.");
            } else {
                req.decoded = decoded;
                callback(null, req);
            }
        });
    }
    else {
        callback(err, "Accest forbidden");
    }
};