console.log("Init express...");
global.env = {};

var async = require('async');
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('./config');
var httpServer = require('./serverHttp.js');
var Passport = require('./passport/init');
var tokenAuth = require('./tokenAuth');

//___________________________________________s__________
var httpMethodMap;
var rpcContext = {};

rpcContext['/user'] = {
    'hello': {
        'handler': require('./paths/user').hello,
        'description': "Hello debater!"
    },
    'getNotifications': {
        'handler': require('./paths/user').getNotifications,
        'description': "gets a specific user's notifications"
    }
};
//_____________________________________________________
var writeHeaders = function(response){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "POST");
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Max-Age", '86400');
    response.header("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept");
    response.header("Content-Type", "application/json");
};

var handleJsonRpcCall = function (input, callback) {
    var err, result;
    if (rpcContext.hasOwnProperty(input.originalUrl)) {
        var rpcFunction = rpcContext[input.originalUrl][input.method].handler;
        var handlerReady = function (err, result) {
            callback(err, result);
        };
        if (Array.isArray(input.params))
            rpcFunction(input.params, handlerReady);
        else {
            err = "Invalid type for params. Array expected";
            result = null;
            callback(err, result);
        }
    }
    else {
        err = "Invalid method";
        result = null;
        callback(err, result);
    }
};

var POST_requestHandler = function (request, response) {
    request.body.originalUrl = request.originalUrl;
    var jsonRpcObject = request.body;

    var rpcCallHanddler = function (error, result) {
        var resultObjet = {
            "id": 1,
            "error": error,
            "result": result
        };

        writeHeaders(response);
        response.end(JSON.stringify(resultObjet));
    };

    handleJsonRpcCall(jsonRpcObject, rpcCallHanddler);
};

var requestHandlerWraper = function (request, response) {
    if (request.url == "/favicon.ico") {
        return;
    }
    console.log(request.method + " - " + request.url);
    if (httpMethodMap.hasOwnProperty(request.method))
        var requestHandler = httpMethodMap[request.method];
    else
        return;
    requestHandler(request, response);
};

var checkAuth = function (req, res) {
    tokenAuth(req.body.params[0], function (err, result) {
        if (err) {
            var resultObjet = {
                "id": 1,
                "error": err,
                "result": result
            };
            writeHeaders(res);
            res.end(JSON.stringify(resultObjet));
        }
        else {
            req.body.params[0] = result.username;
            requestHandlerWraper(req, res);
        }
    });
};

var initExpress = function (app) {

    app.post('/login', require('./paths/login').login);
    app.post('/signup', require('./paths/login').signup);
    app.post('/logout', require('./paths/login').logout);
    app.get('/auth/facebook', require('./paths/login').facebookLogin);
    app.get('/auth/facebook/callback', require('./paths/login').facebookLogin);
    app.get('/auth/google', require('./paths/login').googleLogin);
    app.get('/auth/google/return', require('./paths/login').googleLogin);
    app.post('/user', checkAuth);

    httpMethodMap = {
        "POST": POST_requestHandler
    };
};

var initHttp = function (callback) {
    console.log('Init http');
    httpServer(config.http.port, config.http.host, POST_requestHandler, function (httpServer) {
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

