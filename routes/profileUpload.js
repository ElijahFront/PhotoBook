var User = require('../models/user').User;
var fs = require('fs');

exports.post = function (req, res, next) {

    var id = req.session.id,
        path = 
    
    User.findOne({avatarPath:avatarPath}, function (err, path) {
        if (err) return next(err);
        if (path){
            //Если есть путь к аватарке, то обновляем его и удаляем старую аватарку

        } else {
            //Если пути к аватарке нет, то сохраняем путь и файл

        }
    })
};
