var User = require('../models/user').User;

exports.post = function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var login = req.body.login;

    var user = new User({
        name:name,
        login:login,
        password:password,
        userInfo:'А это описание моего профиля. Я еще не успел его поменять',
        avaPath:'path/to/ava.jpg',
        backgroundPath:'path/to/background.jpg'
    });
    user.save(function(err){
        if (err) {
            return next (err)
        } else{
            res.send(200)
        }
    }
    )
};