var User = require('../models/user').User;
var Album = require('../models/album').Album;
var Photo = require('../models/photo').Photo;

module.exports = function (req, res, next) {
    res.type('html');

    var id = req.session.user;

    User.findOne({_id:id}, function (err, user) {
        if (err) return next(err);

        var userName = user.name,
            userInfo = user.userInfo,
            userAva = user.avaPath,
            userBack = user.backgroundPath,
            userAlbums = user.albums;

        Photo.find({}, function (err, photos) {
            if (err) {
                return next(err);
            } else {

                var ph = photos.reverse();
                console.log(ph);

                if (userAlbums != "") {    // Есть ли у пользователя альбомы. Если нет, но попытаться найти, то MongoDB выдает оштбку и кладет сервер
                    Album.find({name: {$in: userAlbums}}, function (err, album) {    //Находим всальбомы пользователя
                        if (err) {
                            return next(err);
                        } else if (album) {
                            var albums = album,
                                albumID = album._id,
                                numberOfPhotos;

                            res.render('main', {
                                name: userName,
                                info: userInfo,
                                avatar: userAva,
                                cover: userBack,
                                albums: albums,
                                photos: ph,
                                amountOfPhotos: numberOfPhotos
                            });
                        }
                    });

                } else {
                    res.render('main', {
                        name: userName,
                        info: userInfo,
                        avatar: userAva,
                        cover: userBack,
                        photos:ph
                    });
                }
            }
        });
    })
};

