var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;

module.exports = function (req, res, next){
      var albumID = req.params.album;

    Album.findOne({_id:albumID}, function (err, album) {
        if (err) return next(err);
        var albumName = album.name,
            albumInfo = album.description;

        Photo.find({album: {$in: albumID}}, function (err, photo) {
            if (err) return next(err);

            if (photo){
                var photos = photo;

                res.render('album', {
                    name:albumName,
                    info:albumInfo,
                    photos:photos
                })
            } else {
                res.render('album', {
                    name:albumName,
                    info:albumInfo
                })
            }


        })
    })
};