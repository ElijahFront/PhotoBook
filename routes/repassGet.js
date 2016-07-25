var User = require('../models/user').User;
var url = require("url");
var qs = require("querystring");
var nconf = require('nconf');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

/*
Проверяем запрос
есть ли такой код в базе
если есть выводим страницу с формой смены пароля, иначе 403
 */
module.exports = function (req, res, next) {
    var query = url.parse(req.url).query,
    passhesh = qs.parse(query);
    passhesh = passhesh.repass;

    User.findOne({"restorepassword":passhesh}, function (err, repass) {
        if (err) return next(err);
        if (repass){
            //todo нужно в форму передать скрытое поле passhesh
            res.end("Выводим страницу для смены пароля");
        } else {
            // 403
            res.send(403)
        }
    });
};