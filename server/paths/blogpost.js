var Blogpost = require('../models/blogpost'),
    User = require('../models/user'),
    async = require('async');

module.exports.getBlogposts = function (request, response, callback) {
    var r = {};
    var postsPerPage = 3;
    var url = require('url');
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    var getAuthorName = function(id, callback){
        User.findOne({'_id': id}, function(err, user){
            if (err){
                callback(err,null);
            }
            else{
                callback(null,user);
            }
        })
    };

    var decorateBlogpost = function(item, cb){
        getAuthorName(item._doc.created_byID, function(err, user){
            if (user){
                item._doc.author = user._doc.firstName + ' ' + user._doc.lastName;
                cb();
            }
            cb(err);
        })
    };

    if (query.hasOwnProperty('page')) {
        // if there was a specific page requested return that page
        var page = parseInt(query.page) - 1;
        Blogpost.find().count().exec(function (err, number) {
            r.lg = number;
            Blogpost.find().skip(page * postsPerPage).limit(postsPerPage).sort({'created_at': 1}).exec(function (err, arr) {
                r.arr = arr;
                async.each(arr, decorateBlogpost, function(err){
                    callback(err, r);
                });
            })
        });
    }
    else {
        // if there was no page given as query param, get all the posts
        Blogpost.find().count().exec(function (err, number) {
            r.lg = number;
            Blogpost.find().sort({'created_at': 1}).exec(function (err, arr) {
                r.arr = arr;
                async.each(arr, decorateBlogpost, function(err){
                    callback(err, r);
                });
            })
        });
    }

};

module.exports.saveBlogpost = function (request, response, callback){
    var newPost = new Blogpost();
    var data = request.body;
    if (data.hasOwnProperty("content"))
        newPost.content = data.content;
    if (data.hasOwnProperty("created_at"))
        newPost.created_at = data.created_at;
    if (data.hasOwnProperty("created_byID"))
        newPost.created_byID = data.created_byID;
    if (data.hasOwnProperty("photo"))
        newPost.photo = data.photo;
    if (data.hasOwnProperty("title"))
        newPost.title = data.title;

    newPost.save(function (err) {
        if (err) {
            console.log('Error in saving blogpost: ' + err);
            return callback(err, null);
        }
        console.log('Blogpost saving succesful');
        return callback(null, newPost);
    });
};