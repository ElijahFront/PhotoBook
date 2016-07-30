var User = require('../models/user').User;

module.exports = function (req, res, next) {

    var userID = req.params.id;

    if (userID == req.session.user){
        res.redirect('/main')
    } else {

        User.findOne({_id:userID}, function (err, user) {
            if (err) return next(err);

            var albums = user.albums,
                name = user.name,
                userInfo = user.userInfo,
                avaPath = user.avaPath,
                backgroundPath = user.backgroundPath;

            res.render('user', {
                albums:albums,
                avatar:avaPath,
                background:backgroundPath,
                name:name,
                userInfo:userInfo
            })
        })

    }

};