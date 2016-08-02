var User = require('../models/user').User;
var nconf = require('nconf');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(nconf.get('email:transport'));




exports.post = function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var login = req.body.login;
    var emailconf = crypto.createHash('md5')
        .update(name)
        .digest('hex');
    var emaillink = nconf.get('email:confirmlink') + emailconf;

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"' + nconf.get('email:from') + '" <' + nconf.get('email:email') + '>', // sender address
        to: login, // list of receivers
        subject: 'Подтвердите пароль', // Subject line
        text: 'Подтвердите пароль по ссылке ' + emaillink, // plaintext body
        html: 'Подтвердите пароль по ссылке <a href="' + emaillink + '">' + emaillink +'</a>' // html body
    };


    var user = new User({
        name:name,
        login:login,
        password:password,
        emailconf:emailconf,
        userInfo:'А это описание моего профиля. Я еще не успел его поменять',
        avaPath:'path/to/ava.jpg',
        backgroundPath:'path/to/background.jpg'
    });
    user.save(function(err){
        if (err) {
                return next (err);
        } else {
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                    return console.log(err);
                }
                console.log('Message sent: ' + info.response);
            });
                req.session.user = user._id;
                res.sendStatus(200)
        }
    }
    )
};