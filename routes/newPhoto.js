var Photo = require('../models/photo').Photo;
var Album = require('../models/album').Album;

exports.post = function (req, res, next){
    console.log(req.url);

    console.log(req.files.length);
    req.files.forEach(function (file) {
        var _idALBOM = req.params.id,
            imgName =  file.originalname,
            imgInfo = "Добавить описание для фотографий",
            imgLink = file.filename;

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
                res.end();
            });
        });
    });
};
