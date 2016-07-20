var User = require('../models/user').User;
var fs = require('fs');

exports.post = function (req, res, next) {

    // var id = req.session.id,
    //     avatar = req.files.user_edit[0],
    //     avatarPath = req.files[0].path,
    //     background = req.files[1],
    //     backgroundPath = req.files[1].path,
    //     username = req.body.username,
    //     userInfo = req.body.userInfo;
    
    // User.update({_id: id}, $set({avaPath:avatarPath},
    //     {backgroundPath:backgroundPath},
    //     {name:username},
    //     {userInfo:userInfo}),
    //         function (err, path) {
    //             if (err) return next(err);
    //         });
    console.log(req.files);
    console.log(req.body);
    res.end()


};
