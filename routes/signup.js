var User = require('../models/user').User;

exports.post = function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var login = req.body.login;

    var user = new User({name:name, login:login, password:password});
    user.save(function(err){
        if (err) {
            return next (err)
        } else{
            res.send(200)
        }
    }
    )
};