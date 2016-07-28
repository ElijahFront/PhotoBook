var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user').User;

var photoSchema = new Schema({
    album: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    photoLink: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        required: false
    }
});
/*
 При добавлении фотографии в альбом запускаем:
 */
// var photo = new Photo({
//     album: _idALBOM,
//     name: imgName,
//     info: imgInfo,
//     photoLink: imgLink
// });
// photo.save();



/*
Функция лайка:
1. проверяем есть ли такой поьзователь в базе лайковших
2. если есть то убираем лайк
3. если нету то добавляем
___
Возвращает true если лайк добавлен
Возвращает false если лайк удален
 */
photoSchema.methods.setlike = function(userID, callback){
    var pic = this;
        userlik = true;
    User.findOne({_id:userID}, function (err, user) {
        if (err) return next(err);
        if (user){
            pic.likes.forEach(function (val) {
                if (userID == val){
                    userlik = false;
                }
            });
            if (userlik){
                pic.likes.push(userID);
            } else {
                pic.likes.pull(userID);
            }

            pic.save();
        } else {
            //
        }
    callback(err, userlik)
    });
};

photoSchema.index({name:'text', info:'text'});

exports.Photo = mongoose.model('Photo', photoSchema);

/*
Пример использования функции лайков
 */
// var Photo = require('./models/photo').Photo;
//
// // 579648fe3e56460812863f05
// Photo.findOne({_id:"579659b40d9564d03ab2cd4c"}, function (err, photo) {
//     if (err) return next(err);
//     if (photo){
//         photo.setlike('579648fe3e56460812863f05', function (err, res) {
//             console.log(res);
//         });
//
//     } else {
//         // 403
//         res.send(403)
//     }
// });