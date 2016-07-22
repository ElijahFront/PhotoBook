var Album = require('../models/album').Album;

module.exports = function (req, res){
      var albumID = req.params.album;

    Album.findOne({_id:albumID}, function (err, album) {
        var albName = album.name,
            albDescription = album.description,
            albCover = album.coverID;

        Photos.find({album_id:albumID}, function (err, photo) {
            if (err) return next(err);

            var photos = photo;

            res.render('album', {
                albumName:albName,
                albInfo:albDescription,
                albCover:albCover,
                photos:photos
            })
        })
    })
};