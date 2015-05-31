var Blogpost = require('../models/blogpost');

module.exports.getBlogposts = function (request, response, callback) {
    var r = {};
    var postsPerPage = 3;
    var url = require('url');
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var page = parseInt(query.page) - 1;
    Blogpost.find().count().exec(function(err, number){
        r.lg = number;
        Blogpost.find().skip(page * postsPerPage).limit(postsPerPage).sort({'created_at': 1}).exec(function(err,arr){
            r.arr = arr;
            callback(err, r);
        })
    });

};