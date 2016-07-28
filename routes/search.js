var User = require('../models/user').User;
var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;
var async = require('async');

module.exports = function (req, res, next){

    var query = req.params.query,
        id = req.session.user;

    User.findOne({_id:id}, function (er, us) {
       if (er) return next(er);

        if (us){
            var name = us.name,
                ava = us.avaPath;

            async.parallel([
                function (callback) {
                    Album.find({
                        $text : { $search : query }
                    }, function (er, result) {
                        if (er) return next(er);
                        callback(null, result)
                    })
                },
                function (callback) {
                    Photo.find({
                        $text : { $search : query }
                    }, function (er, result) {
                        if (er) return next(er);
                        callback(null, result)
                    })
                }
            ], function (e, results) {
                var albums = results[0],
                    photos = results[1];

                res.render('search', {
                    albums:albums,
                    photos:photos,
                    username:name,
                    avatar:ava
                });

            });
        }
    });

};