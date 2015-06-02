console.log("Init express...");
global.env = {};

var async = require('async'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config'),
    httpServer = require('./serverHttp.js'),
    Passport = require('./passport/init'),
    tokenAuth = require('./tokenAuth'),
    tv4 = require('tv4'),
    schema = require('./schema'),
    error_handler = require('./error_handler');

var httpMethodMap = {
    'GET': {
        '/user/notifications': require('./paths/user').getNotifications,
        '/blogpost': require('./paths/blogpost').getBlogposts,
        '/user': require('./paths/user').getUser,
        '/group': require('./paths/group').getGroup
    },
    'POST': {
        '/user': require('./paths/user').hello,
        '/blogpost': require('./paths/blogpost').saveBlogpost,
        '/group': require('./paths/group').createGroup,
        '/notification': require('./paths/notification').sendNotification,
        '/competitions': require('./paths/competitions').addCompetition,
        '/user/debateHistory': require('./paths/user').addDebateHistory
    },
    'PUT': {
        '/group': require('./paths/group').updateGroup
    },
    'DELETE': {
        '/group': require('./paths/group').deleteGroup
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

var validateParams = function (request, response, callback) {
    if (schema[request.method] && schema[request.method][request._parsedUrl.pathname]) {
        var tv4Result = tv4.validateResult(request.body, schema[request.method][request._parsedUrl.pathname]);
        if (tv4Result.error) {
            var errObj = error_handler.extract_error(tv4Result.error);
            var resultObjet = {
                "error": error_handler.errMsg[errObj.code],
                "result": null
            };
            writeHeaders(response);
            response.status(403).send(JSON.stringify(resultObjet));
        }
        else {
            callback(request, response);
        }
    }
    else
        callback(request, response);
};

var requestHandlerWraper = function (request, response) {
    console.log(request.method + " - " + request.url);
    if (httpMethodMap.hasOwnProperty(request.method) && httpMethodMap[request.method].hasOwnProperty(request._parsedUrl.pathname))
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

var allowCrossDomain = function (req, res, next) {
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
        else {
            req.params.username = result.username;
            validateParams(req, res, requestHandlerWraper);
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
    app.all('/user/*', checkAuth);
    app.get('/blogpost', requestHandlerWraper);
    app.post('/blogpost', checkAuth);
    app.get('/group', requestHandlerWraper);
    app.post('/group', checkAuth);
    app.put('/group', checkAuth);
    app.delete('/group', checkAuth);
    app.post('/notification', checkAuth);
    app.post('/competitions', checkAuth);

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