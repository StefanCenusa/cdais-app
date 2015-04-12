var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var init = function (serverPort, serverAddress, postHandler, callback) {
    app.listen(serverPort, serverAddress);
    callback(app);
};

module.exports = init;
