var Blogpost = require('../models/models');

module.exports.getBlogposts = function (request, response, callback) {
    var r = [];
    var postsPerPage = 3;
    var page = request.params - 1;
    Blogpost.find().sort({created_at: -1}).skip(page).limit(postsPerPage).toArray(function(err, arr){
        console.log();
    });
};