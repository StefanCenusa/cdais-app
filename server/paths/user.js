var tokenAuth = require('.././tokenAuth');

module.exports.hello = function (paramas, callback) {
    tokenAuth(paramas, function(err, result){
        if (err){
            callback(err, result);
        }
        else{
            //do your job
            var r={ "text": "r is the result of process data"};
            // r is the result of process data
            callback(null, r);
        }

    });
};