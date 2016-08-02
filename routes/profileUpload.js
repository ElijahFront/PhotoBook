var User = require('../models/user').User;
var fs = require('fs');
var async = require('async');

exports.post = function (req, res, next) {

    // Получаем старый путь
    // Удаляем файл
    // Обновляем путь в БД

    var id = req.session.user,
        avatar = req.files[0],
        //avatarPath = req.files[0].filename,
        background = req.files[1],
        //backgroundPath = req.files[1].filename,
        username = req.body.edit__profile_inp[0],
        userInfo = req.body.edit__profile_inp[1];
    if (avatar){
        var avatarPath = req.files[0].filename
    }
    if (background){
        var backgroundPath = req.files[1].filename
    }

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

            // User.update({_id: id}, {
            //
            //         avaPath:avatarPath,
            //         backgroundPath:backgroundPath,
            //         name:username,
            //         userInfo:userInfo},
            //     function (err, success) {
            //         if (err) return next(err);
            //         console.log('updating succeed')

            if (avatarPath && backgroundPath){
                User.update({_id: id}, {
                        avaPath:avatarPath,
                        backgroundPath:backgroundPath,
                        name:username,
                        userInfo:userInfo},
                    function (err) {
                        if (err) return next(err);
                        console.log('updating succeed')

                });
            } else if (!backgroundPath){
                User.update({_id: id}, {
                        avaPath:avatarPath,
                        name:username,
                        userInfo:userInfo},
                    function (err) {
                        if (err) return next(err);
                        console.log('updating succeed')
                    });
            } else if (!avatarPath){
                User.update({_id: id}, {
                    name: username,
                    userInfo: userInfo,
                    backgroundPath: backgroundPath
                },
                    function (err) {
                        if (err) return next(err);
                        console.log('updating succeed')
                    });
            }
        }
    ]);
    res.end()

};
