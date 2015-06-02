var jwt = require('jsonwebtoken');
env.superSecret = 'MarianPresedinte';

module.exports.login = function (req, res) {
    env.passport.authenticate('login', function (err, user, info) {
        if (err) return res.status(403).json({
            success: false,
            message: err
        });
        if (!user)
            return res.status(403).json({
                success: false,
                message: info
            });

        var token = jwt.sign({
            username: user.username
        }, env.superSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });
        return res.status(200).json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    })(req, res);
};

module.exports.signup = function (req, res) {
    env.passport.authenticate('signup', function (err, user, info) {
        if (err) return res.status(403).json({
            success: false,
            message: err
        });
        if (!user)
            return res.status(403).json({
                success: false,
                message: info
            });
        return res.status(200).json({
            success: true,
            message: 'User created'
        });
    })(req, res);
};

module.exports.facebookLogin = function (req, res) {
    env.passport.authenticate('facebook', function (err, user, info) {
        if (err) return res.status(403).json({
            success: false,
            message: err
        });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: info
            });

        }
        var token = jwt.sign({
            name: user.name,
            username: user.username
        }, env.superSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        return res.redirect('http://localhost:3030/auth?token='+token);
    })(req, res);
};

module.exports.googleLogin = function (req, res) {
    env.passport.authenticate('google', function (err, user, info) {
        if (err) return res.status(403).json({
            success: false,
            message: err
        });
        if (!user)
            return res.status(403).json({
                success: false,
                message: info
            });
        var token = jwt.sign({
            name: user.name,
            username: user.username
        }, env.superSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });
        return res.redirect('http://localhost:3030/auth?token='+token);
    })(req, res);
};