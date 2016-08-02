var checkAuth = require('./auth');
var multer  = require('multer');
var userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp/my-uploads/users')
    },
    filename: function (req, file, cb) {
        var name = file.originalname.replace((/\s+/g, ''));
        cb(null, Date.now() + '_' + name)
    }
});
var albStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp/my-uploads/photos')
    },
    filename: function (req, file, cb) {
        var name = file.originalname.replace((/\s+/g, ''));
        cb(null, Date.now() + '_' + name)
    }
});

var uploadUser = multer({ storage: userStorage });
var createAlb = multer({ storage: albStorage });


module.exports = function (app) {
    app.post('/login', require('./login').post);
    app.post('/logout', checkAuth, require('./logout').post);
    app.post('/signUp', require('./signup').post);
    app.post('/profileUpload', uploadUser.array('edit__profile_inp'), require('./profileUpload').post);
    app.post('/createAlbum', createAlb.array('addAlbum'), require('./newAlbum').post);
    app.post('/more', require('./more').post);
    app.post('/albums/:id/addPhoto', createAlb.single('add_photo'), require('./newPhoto').post);
    app.post('/editPhoto', require('./editPhoto'));

    app.get(['/confirm/:conf'], require('./confirm'));
    app.get('/main', checkAuth, require('./main'));
    app.get('/user/:id', require('./users').get);
    app.get('/albums/:album', checkAuth, require('./albums').get);
    app.get(['/', '/index'], require('./render'));
    app.get('/search/:query', require('./search'));
    app.get('/albums/:album/editPhoto#:id', require('./editPhoto'));



    // app.route('/repass')
    //     .get(require('./repassGet'))
    //     .post(require('./repass'));
};