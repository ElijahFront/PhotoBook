var User = require('../models/user').User;
var Album = require('../models/album').Album;
var Photo = require('../models/album').Photo;

module.exports = function (req, res) {
    res.type('html');

    var id = req.session.user;

    User.findOne({_id:id}, function (err, user) {
        if (err) return next(err);

        var userName = user.name,
            userInfo = user.userInfo,
            userAva = user.avaPath,
            userBack = user.backgroundPath,
            userAlbums = user.albums;

        Album.find({_id:userAlbums}, function (err, album) {
            if (err) return next(err);
            var albums = album,
                albumID = album._id,
                numberOfPhotos = album.photos;

            Photo.find({}, function (err, photos) {
                var photos = photos;

                res.render('main', {
                    name:userName,
                    info:userInfo,
                    avatar:userAva,
                    cover:userBack,
                    albums:albums,
                    photos:photos,
                    amountOfPhotos:numberOfPhotos
                })
            })
         })

    });

};
