var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var httpMethodMap = {};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var userPostHandler;

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


var POST_requestHandler = function (request, response) {
    request.body.originalUrl = request.originalUrl;
    userPostHandler(request, response);
};

var init = function (serverPort, serverAddress, postHandler, callback) {
    userPostHandler = postHandler;

    app.post('/login', require('./paths/login').login);
    app.post('/signup', require('./paths/login').signup);
    app.post('/logout', require('./paths/login').logout);
    app.post('/user/getDebaterInfo', requestHandlerWraper);

    app.listen(serverPort, serverAddress);

    httpMethodMap = {
        "POST": POST_requestHandler
    };

    callback(app);
};

module.exports = init;
