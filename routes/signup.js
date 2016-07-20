var User = require('../models/user').User;
var crypto = require('crypto');
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://логин%40gmail.com:Пароль@smtp.gmail.com');




exports.post = function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var login = req.body.login;
    var emailconf = crypto.createHash('md5')
        .update(name)
        .digest('hex');


// setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"' + name + '" <confirm@gmail.com>', // sender address
        to: login, // list of receivers
        subject: 'Подтвердите пароль', // Subject line
        text: 'Подтвердите пароль по ссылке http://localhost:3035/confirm/' + emailconf, // plaintext body
        html: 'Подтвердите пароль по ссылке <a href="http://localhost:3035/confirm/' + emailconf + '">http://localhost:3035/confirm/' + emailconf +'</a>' // html body
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
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(err, info){
                if(err){
                    return console.log(err);
                }
                console.log('Message sent: ' + info.response);

                return next (err);
            });

        } else {
            res.send(200)
        }
    }
    )
};