var Photo = require('../models/photo').Photo;
var Album = require('../models/album').Album;

exports.post = function (req, res, next){

    var _idALBOM = req.params.id,
        imgName = req.body.add_photo,
        imgInfo = "Добавить описание для фотографий",
        imgLink = req.file.filename;

    var photo = new Photo({
        album: _idALBOM,
        name: imgName,
        info: imgInfo,
        photoLink: imgLink
    });
    photo.save(function (err, ph) {
        if (err) return next(err);
        var aID = _idALBOM,
            phName = ph.photoLink;
        Album.findByIdAndUpdate(aID, {$push :{photos:phName}}, function (er, num) {

            if (er) return next(er);
            console.log(num)
        });
        res.end();
    });
};