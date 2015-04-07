var jwt = require('jsonwebtoken');
env.superSecret = 'MarianPresedinte';

module.exports.login = function (req, res) {
    env.passport.authenticate('login', function (err, user, info) {
        if (err) return res.json({
            success: false,
            message: err
        });
        if (!user)
            return res.json({
                success: false,
                message: info
            });

        var token = jwt.sign({
            name: user.name,
            username: user.username
        }, env.superSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        return res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    })(req, res);
};

module.exports.signup = function (req, res) {
    passport.authenticate('signup', function (err, user, info) {
        if (err) return  res.json({
            success: false,
            message: err
        });
        if (!user)
            return  res.json({
                success: false,
                message: info
            });
        return  res.json({
            success: true,
            message: 'User created'
        });
    })(req, res);
};

module.exports.logout = function (req, res) {
    req.logout();
    res.json({
        success: true,
        message: 'User logged out'
    });
};