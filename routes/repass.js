var User = require('../models/user').User;
var nconf = require('nconf');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(nconf.get('email:transport'));

/*
Получаем запрос на восстановление пароля
НЕОБХОДИМО POST поле email,
Со страницы восстановления надо получить 2 POST запроса:
 passhesh
 password
 */
//todo сделать проверку и обезопасить пароль, если нужо
module.exports = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var passhesh = req.body.passhesh;
    password = '123';
    if (email) {
        var passreadd = crypto.createHash('md5')
            .update(email)
            .digest('hex');
        User.findOne({login:email}, function (err, user) {
            if (err) {
                return next(err);
            } else {
                if (user){
                    console.log(user);

                    user.update({$set: {restorepassword:passreadd}}, function (err, res) {
                        if (err) {
                            return next (err);
                        } else {
                            console.log('update');
                            user_re_password(email, passreadd, function(err, info) {
                                if (err) {
                                    return next(err);
                                } else {
                                    console.log('Message sent: ' + info.response);
                                }
                            });
                        }
                    });


                    res.end();
                } else {
                    res.send(403);
                }
            }
        });
    } else if (password) {
        User.findOne({"restorepassword":passhesh}, function (err, user) {
            if (err) return next(err);
            if (user){
                user.update({$unset: {"restorepassword":passhesh}}, function (err, res) {
                    if (err) {
                        return next(err);
                    } else {
                        console.log(res);
                    }
                });
                user.set('password', password);
                user.save();
                res.end();

            } else {
                // 403
                res.send(403)
            }
        });
        res.sendStatus(200);
    }
};

function user_re_password(email, passreadd, callback) {
    // setup e-mail data with unicode symbols
    var emaillink = "/repass?repass=" + passreadd;
    var mailOptions = {
        from: '"' + nconf.get('email:from') + '" <' + nconf.get('email:email') + '>', // sender address
        to: email, // list of receivers
        subject: 'Восстановление пароля', // Subject line
        text: 'Чтобы восстановить пароль перейдите по ссылке ' + emaillink, // plaintext body
        html: 'Чтобы восстановить пароль перейдите по ссылке  <a href="' + emaillink + '">' + emaillink +'</a>' // html body
    };
    transporter.sendMail(mailOptions, function(err, info) {
        callback(err, info);
    });
}