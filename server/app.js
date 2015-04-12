console.log("Init express...");
global.env = {};

var async = require('async');
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('./config');
var httpServer = require('./serverHttp.js');
var Passport = require('./passport/init');

//_____________________________________________________
var httpMethodMap;
var rpcContext = {};
rpcContext['/user'] = {
    'hello': {
        'handler': require('./paths/user').hello,
        'description': "Hello debater!"
    },
    'getNotifications' : {
        'handler': require('./paths/user').getNotifications,
        'description': "gets a specific user's notifications"
    }
};
//_____________________________________________________
var handleJsonRpcCall = function (input, callback) {
    if (rpcContext.hasOwnProperty(input.originalUrl)) {
        var rpcFunction = rpcContext[input.originalUrl][input.method].handler;
        var handlerReady = function (err, result) {
            callback(err, result);
        };
        if (Array.isArray(input.params))
            rpcFunction(input.params, handlerReady);
        else {
            var err = "Invalid type for params. Array expected";
            var result = null;
            callback(err, result);
        }
    }
    else {
        var err = "Invalid method";
        var result = null;
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
        var headers = {};

        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST";
        headers["Access-Control-Allow-Credentials"] = true;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
        headers["Content-Type"] = "application/json";

        response.writeHead(200, headers);
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

var initExpress = function (app) {

    app.post('/login', require('./paths/login').login);
    app.post('/signup', require('./paths/login').signup);
    app.post('/logout', require('./paths/login').logout);
    app.get('/auth/facebook', require('./paths/login').facebookLogin);
    app.get('/auth/facebook/callback', require('./paths/login').facebookLogin);
    app.get('/auth/google', require('./paths/login').googleLogin);
    app.get('/auth/google/return', require('./paths/login').googleLogin);
    app.post('/user', requestHandlerWraper);

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

var initPassport = function(callback){
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

