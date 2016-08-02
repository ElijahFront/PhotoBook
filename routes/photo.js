var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;
var User = require('../models/user').User;

module.exports = function (req, res, next){
    var photoID = req.params.photo;
    var photoN,
        photoPrev,
        photoNext;

    Photo.find( { } , function (err, photo) {
        if (err) return next(err);

        photo.find(function(element, index, array) {
            if (element._id == photoID) {
                photoN = index;
            }
        });


        photoPrev = photoN - 1;
        if (photoPrev < 0 ) {
            photoPrev = photo.length - 1;
        }

        photoNext = photoN + 1;
        if (photoNext > photo.length - 1) {
            photoNext = 0;
        }


        var imgName = photo[photoN].name;
        var imgInfo = photo[photoN].info;
        var imgLikes = photo[photoN].likes.length;
        var imgPath = photo[photoN].photoLink;

        var albumID = photo[photoN].album;


        Album.findOne( { _id : albumID }, function (err, album) {
            if (err) return next(err);
            // var albumName = album.name,
            //     albumInfo = album.description,
            //     albumCover = album.coverID,
            var user = album.author;


            User.findById(user, function (e, u) {
                if (e) return next(e);

                var uName = u.name,
                    uAva = u.avaPath;

                res.set('views', './build');
                res.render('photo', {
                    imgName: imgName,
                    imgInfo: imgInfo,
                    imgLikes: imgLikes,
                    imgPath: imgPath,

                    userName:uName,
                    userAva:uAva,

                    nextImgPath: "/photo/" + photo[photoNext]._id,
                    prevImgPath: "/photo/" + photo[photoPrev]._id
                });
            });
        });
    });
};
