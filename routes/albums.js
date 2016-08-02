var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;
var User = require('../models/user').User;

module.exports = function (req, res, next){

    var albumID = req.params.album;
    var currentUser = req.session.user;


    Album.findOne({_id:albumID}, function (err, album) {
        if (err) return next(err);
        var albumName = album.name,
            albumInfo = album.description,
            albumCover = album.coverID,
            user = album.author;
        var editPh = false;
        if (user == currentUser){
            var editPh = true
        }

        Photo.find({album: {$in: albumID}}, function (err, photo) {
            if (err) return next(err);

            User.findById(user, function (e, u) {
                if (e) return next(e);

                var uName = u.name,
                    uAva = u.avaPath;

                if (photo){

                    var photos = photo.reverse();

                    res.render('album', {
                        name:albumName,
                        info:albumInfo,
                        cover:albumCover,
                        photos:photos,
                        userName:uName,
                        userAva:uAva,
                        editPh:editPh
                    })
                } else {
                    res.render('album', {
                        name:albumName,
                        info:albumInfo,
                        cover:albumCover,
                        userName:uName,
                        userAva:uAva,
                        editPh:editPh
                    })
                }
            });
        })
    })
};
