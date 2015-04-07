console.log("Init express...");
global.env = {};

var async = require('async');
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('./config');
var httpServer = require('./serverHttp.js');
var Passport = require('./passport/init');

var rpcContext = {};
//_____________________________________________________

rpcContext['/user'] = {
    'hello': {
        'handler': require('./paths/user').hello,
        'description': "Hello debater!"
    }
};
//_____________________________________________________
var handleJsonRpcCall = function (input, callback) {
    if (rpcContext.hasOwnProperty(input.originalUrl)) {
        var rpcFunction = rpcContext[input.originalUrl][input.method].handler;
        var handlerReady = function (err, result) {
            callback(err, result);
        };
        //input.params.push(handlerReady);
        rpcFunction(input.params, handlerReady);
    }
    else {
        var err = "Invalid method";
        var result = null;
        callback(err, result);
    }
};

var POST_requestHandler = function (request, response) {
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
        // respond to the request
        response.writeHead(200, headers);
        response.end(JSON.stringify(resultObjet));
    };

    handleJsonRpcCall(jsonRpcObject, rpcCallHanddler);
};

var initHttp = function (callback) {
    console.log('Init http');
    httpServer(config.http.port, config.http.host, POST_requestHandler, function (httpServer) {
        env.express = httpServer;
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

