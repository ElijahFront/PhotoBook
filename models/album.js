var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    name:{
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    },
    coverID:{
        required: true,
        type: String
    }
});

exports.Album = mongoose.model('Album', albumSchema);