var jwt = require('jsonwebtoken');

module.exports = function (req, callback) {
    var token = req[0];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, env.superSecret, function (err, decoded) {
            if (err) {
                callback(err, "Failed to authenticate token.");
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log(req.decoded);
                //next(res); // make sure we go to the next routes and don't stop here
                callback(null, "Acces granted");
            }
        });
    }

    else {

        // if there is no token
        // return an HTTP response of 403 (access forbidden) and an error message
        callback(err, "Accest forbidden");

    }
};