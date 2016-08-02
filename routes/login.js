var User = require('../models/user').User;

exports.post = function (req, res, next) {
    var password = req.body.password;
    var login = req.body.login;

    // 1. Получить пользователя с таким login из базы
    // 2. Пользователь найден?
        // Да : проверяем пароль с помощью функции-дешифратора пароля
        // Нет : res.set(403) (forbidden)
    // 3. Автроризация пройдена?
        // Да : сохранить айди пользователя в сессию
        // Нет : см. 2.2

    
    User.findOne({login:login}, function (err, user) {
        //console.log(user);
        if (err) return next(err);
        if (user){
            console.log('smth found');
            if(user.checkPassword(password)){
                // ..200
                req.session.user = user._id;
                console.log('redirecting');
                res.sendStatus(200);
            } else {
                // 403
                res.send(403)
            }
        } else {
            console.log('user not found');
            // 403
            res.send(403)
        }
    })
};
