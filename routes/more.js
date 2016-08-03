var Photo = require('../models/photo').Photo;
var Album = require('../models/album').Album;
var User = require('../models/user').User;
var async = require('async');

exports.post = function (req, res, next) {
    var startn = req.body.startn * 1;
    var stepn = req.body.stepn * 1;

    // 1. Получить количество фото уже на странице и шаг фотографий
    // 2. произвести поиск в базе

    Photo.find({ }, null, { skip: startn, limit: stepn }, function (err, newPhoto) {
        if (err) return next(err);
        var html = '';
        if (newPhoto){
            if (newPhoto.length){
                // async.each(newPhoto, function (img, callback) {
                //     console.log(img);
                //     callback(null, img);
                // }, function (err, sende) {
                //     console.log(sende);
                // });
                newPhoto.forEach(function (item, i, arr) {
                    var imgId = item._id,
                        imgAlbumId = item.album,
                        imgName = item.name,
                        imgInfo = item.info,
                        imgLink = item.photoLink,
                        imgLikes = item.likes.length;

                    console.log(imgAlbumId);
                    Album.findOne({_id: imgAlbumId}, function (err, photoAlbum) {
                        if (err) return next(err);
                        if (photoAlbum){
                            var albumId = photoAlbum._id;
                            var albumName = photoAlbum.name;
                            var imgAuthor = photoAlbum.author;
                            User.findOne({_id: imgAuthor}, function (err, photoUser) {
                                if (err) return next(err);
                                if (photoUser){

                                    html = html + '<li class="news__item"><div class="news__block"><div class="news__img__wrap"><img src="./my-uploads/photos/' +
                                        imgLink +
                                        '" class="news__img"><a href="#" class="news__mask">посмотреть фото<svg role="img" class="svg-loupe-dims"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/svg-sprite.svg#loupe"></use></svg></a></div><div class="news__desc"><div class="news__author"><img src="'+
                                        photoUser.avaPath +
                                        '" class="news__author__img"><a href="/user/' +
                                        photoUser._id +
                                        '" class="news__author__mask">о пользователе<svg role="img" class="svg-more-dims"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/svg-sprite.svg#more"></use></svg></a></div><div class="other"><div class="news__img__name">' +
                                        imgName +
                                        '</div><div class="comments__likes__block"><div class="comments"><svg role="img" class="svg-comments-dims"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/svg-sprite.svg#comments"></use></svg><div class="comments__count">nan</div></div><div class="like"><svg role="img" class="svg-like-dims"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/svg-sprite.svg#like"></use></svg><div class="like__count">' +
                                        imgLikes +
                                        '</div></div></div></div></div><div class="news__album"><a href="/albums/' +
                                        albumId +
                                        '" class="news__album__name">' +
                                        albumName +
                                        '</a><svg role="img" class="svg-album-dims"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/svg-sprite.svg#album"></use></svg></div></div></li>'
                                    ;
                                    if (i == newPhoto.length-1) {
                                        res.end(html);
                                    }
                                }
                            });
                        }
                    });
                });
            } else {
                html = 'фото больше нет';
                res.end(html);
            }
        } else {
            // 403
            res.send(403)
        }
    })
};