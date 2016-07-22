var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   login: {
       type: String,
       unique: true,
       required: true
   },
    name: {
        type: String,
        required: true
    },
    hashedPassword:{
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    emailconf: {
        type: String,
        required: false
    },
    userInfo:{
        type: String,
        required: true
    },
    avaPath:{
        type: String,
        required: true
    },
    backgroundPath:{
        type: String,
        required: true
    },
    albums: {
        type: [String]
    }
});

userSchema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
};
userSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password)
    })
    .get(function () {
        return this._plainPassword
    });

userSchema.methods.checkPassword = function (password) {
  return this.hashedPassword == this.encryptPassword(password)
};

exports.User = mongoose.model('User', userSchema);