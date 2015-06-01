console.log("Init express...");
global.env = {};

var async = require('async'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config'),
    httpServer = require('./serverHttp.js'),
    Passport = require('./passport/init'),
    tokenAuth = require('./tokenAuth');

var httpMethodMap = {
    'GET': {
        '/user/notifications': require('./paths/user').getNotifications,
        '/blogpost': require('./paths/blogpost').getBlogposts,
        '/user': require('./paths/user').getUser
    },
    'POST':{
        '/user': require('./paths/user').hello,
        '/blogpost': require('./paths/blogpost').saveBlogpost
    }
};

var writeHeaders = function (response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Max-Age", '86400');
    response.header("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept");
    response.header("Content-Type", "application/json");
};

var requestHandlerWraper = function (request, response) {
    console.log(request.method + " - " + request.url);
    if (httpMethodMap.hasOwnProperty(request.method))
        var requestHandler = httpMethodMap[request.method][request._parsedUrl.pathname];
    else
        return;
    requestHandler(request, response, function (err, result) {
        var resultObjet = {
            "error": err,
            "result": result
        };
        writeHeaders(response);
        response.status(200).send(JSON.stringify(resultObjet));
    });
};

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

var checkAuth = function (req, res) {
    var urlFormatter = require('url');
    var params = urlFormatter.parse(req.url, true).query;
    tokenAuth(params.token, function (err, result) {
        if (err) {
            var resultObjet = {
                "error": err,
                "result": result
            };
            writeHeaders(res);
            res.status(403).send(JSON.stringify(resultObjet));
        }
        else{
            req.params.username = result.username;
            requestHandlerWraper(req, res);
        }
    });
};

var initExpress = function (app) {

    app.use(allowCrossDomain);
    app.post('/auth/login', require('./paths/login').login);
    app.post('/auth/signup', require('./paths/login').signup);
    app.get('/auth/facebook', require('./paths/login').facebookLogin);
    app.get('/auth/facebook/callback', require('./paths/login').facebookLogin);
    app.get('/auth/google', require('./paths/login').googleLogin);
    app.get('/auth/google/return', require('./paths/login').googleLogin);
    app.all('/user', checkAuth);
    app.get('/blogpost', requestHandlerWraper);
    app.post('/blogpost', checkAuth);

};

var initHttp = function (callback) {
    console.log('Init http');
    httpServer(config.http.port, config.http.host, function (httpServer) {
        env.express = httpServer;
        initExpress(env.express);
        callback();
    });
};

var initMongo = function (callback) {
    console.log('Init mongo');
    mongoose.connect(config.mongo.host);
    callback();
};

var initPassport = function (callback) {
    console.log('Init passport');
    env.express.use(passport.initialize());
    env.express.use(passport.session());

    Passport(passport);
    env.passport = passport;
    callback();
};

var initApp = function () {
    async.series([initMongo, initHttp, initPassport], function (err) {
        if (!err)
            console.log('Init app done!\n--------------------------');
        else
            console.log(err.message);
    });
};

initApp();