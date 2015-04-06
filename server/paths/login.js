module.exports.login = function(req, res){
    env.passport.authenticate('login', function(err, user, info){
        if (err) return res.send(err);
        if (!user)
            return res.send(info);
        return res.send('OK!');
    })(req, res);
};

module.exports.signup = function(req, res) {
    passport.authenticate('signup', function (err, user, info) {
        if (err) return res.send(err);
        if (!user)
            return res.send(info);
        return res.send('OK!');
    })(req, res);
};

module.exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};