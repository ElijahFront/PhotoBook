var Album = require('../models/album').Album;

exports.post = function (req, res, next){

    var author = req.session.user,
        name = req.body.addAlbumName,
        description = req.body.addAlbumDesc,
        coverID = '../tmp/my-uploads/photos' + req.file.filename;

    var album = new Album({
        author: author,
        name:name,
        description: description,
        coverID:coverID
    });

    album.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.sendStatus(200)
        }
    })
};