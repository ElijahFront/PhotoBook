var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    author:{
        required: true,
        type: String
    },
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
    },
    photos:{
        type: [Number]
    }
});

albumSchema.index({name:'text', description:'text'});

exports.Album = mongoose.model('Album', albumSchema);