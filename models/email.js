// Пример работы мейлера
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://loftschool.photobook%40gmail.com:ekb96reg@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo 👥" <evd1ser@gmail.com>', // sender address
    to: 'evd-se@ya.ru', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(err, info){
    if(err){
        return console.log(err);
    }
    console.log('Message sent: ' + info.response);
});