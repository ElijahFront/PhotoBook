var User = require('../models/user').User;
var fs = require('fs');
var async = require('async');

exports.post = function (req, res, next) {

    // Получаем старый путь
    // Удаляем файл
    // Обновляем путь в БД

    var id = req.session.user,
        avatar = req.files[0],
        avatarPath = req.files[0].path,
        background = req.files.user__back__input,
        backgroundPath = req.files[1].path,
        username = req.body.edit__profile_inp[0],
        userInfo = req.body.edit__profile_inp[1];

    console.log('username: '+username + ', userInfo: '+userInfo);


    async.series([
        function (callback) {
            User.findOne({_id:id}, function (err, user) {
                if (err) return next(err);

                var oldAvatar = user.avaPath;
                var oldBack = user.backgroundPath;

                // fs.unlink([oldAvatar, oldBack], function (err) {
                //     if (err) return next(err);
                // });
                console.log('Старые пути' + oldAvatar + ', ' + oldBack)

            });
            callback()
        },
        function (callback) {
            console.log('updating function');
            User.update({_id: id}, {

                    avaPath:avatarPath,
                    backgroundPath:backgroundPath,
                    name:username,
                    userInfo:userInfo},
                function (err, success) {
                    if (err) return next(err);
                    console.log('updating succeed')
                });

        }
    ]);

    // console.log(req.files);
    res.end()

};
