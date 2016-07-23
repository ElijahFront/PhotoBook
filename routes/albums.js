var Album = require('../models/album').Album;

module.exports = function (req, res){
      var albumID = req.params.album;

    Album.findOne({_id:albumID}, function (err, album) {
        var alb = album;

        Photos.find({album_id:albumID}, function (err, photo) {
            if (err) return next(err);

            var photos = photo;

            res.render('album', {
                albums:alb,
                photos:photos
            })
        })
    })
};