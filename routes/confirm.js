var User = require('../models/user').User;

module.exports = function (req, res, next) {
    var confmail = req.params.conf;

    // 1. Получить пользователя с таким conformemail из базы
    // 2. Пользователь найден?
    // Да : удаляемм хэш, отправляем сообщение
    // Нет : res.set(403) (forbidden)

    User.findOne({emailconf:confmail}, function (err, conf) {
        if (err) return next(err);
        if (conf){

            conf.update({$unset: {emailconf:confmail}}, function (err, res) {
                res.send("Почта успешно подтверждена");
            });


        } else {
            // 403
            res.send(403)
        }
    })

};
