var Album = require('../models/album').Album;
var User = require('../models/user').User;

exports.post = function (req, res, next){

    var author = req.session.user,
        name = req.body.addAlbumName,
        description = req.body.addAlbumDesc;
        //coverID = '../tmp/my-uploads/photos' + req.file.filename;

    var album = new Album({
        author: author,
        name:name,
        description: description
        //coverID:coverID
    });

    album.save(function(err, alb) {
        if (err) {
            return next(err);
        } else {
            var alName = alb.name;
            console.log(alName);

            User.findByIdAndUpdate(author, {$push :{albums:alName}}, function (er, num) {
                if (er) return next(er);
                console.log(num)
                }

            );

            res.sendStatus(200)
        }
    })
};