var User = require('../models/user').User;
var fs = require('fs');
var async = require('async');

exports.post = function (req, res, next) {

    // Получаем старый путь
    // Удаляем файл
    // Обновляем путь в БД

    var id = req.session.id,
        avatar = req.files.user__avatar__input,
        avatarPath = req.files.user__avatar__input.path,
        background = req.files.user__back__input,
        backgroundPath = req.files.user__back__input.path,
        username = req.body.user__name__input,
        userInfo = req.body.user__text__input;

    async.series([
        function () {
            User.findOne({_id:id}, function (err, user) {
                if (err) return next(err);

                var oldAvatar = user.avaPath;
                var oldBack = user.backgroundPath;

                fs.unlink([oldAvatar, oldBack], function (err) {
                    if (err) return next(err);
                });

            });
        },
        function () {
            User.update({_id: id}, $set(
                {avaPath:avatarPath},
                {backgroundPath:backgroundPath},
                {name:username},
                {userInfo:userInfo}),
                function (err, path) {
                    if (err) return next(err);
                });
        }
    ]);
    
    console.log(req.files);
    res.end()

};
