var Photo = require('../models/photo').Photo;

exports.post = function (req, res, next){

    var _idALBOM = req.params.id,
        imgName = req.file.originalname,
        imgInfo = "Добавить описание для фотографий",
        imgLink = req.file.filename;

    var photo = new Photo({
        album: _idALBOM,
        name: imgName,
        info: imgInfo,
        photoLink: imgLink
    });
    photo.save(function () {
        res.end();
    });
};