var checkAuth = require('./auth');
var multer  = require('multer');
var userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './builder/my-uploads/users')
    },
    filename: function (req, file, cb) {
        var name = file.originalname.replace((/\s+/g, ''));
        cb(null, Date.now() + '_' + name)
    }
});
var albStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './builder/my-uploads/photos')
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
    app.post('/albums/:id/addPhoto', createAlb.single('addPhoto'), require('./newPhoto').post);

    app.get(['/confirm/:conf'], require('./confirm'));
    app.get('/main', checkAuth, require('./main'));
    app.get('/user/:id', require('./users'));
    app.get('/albums/:album', checkAuth, require('./albums'));
    app.get('/search', checkAuth, require('./render'));
    app.get('/album', checkAuth, require('./render'));
    app.get(['/', '/index'], require('./render'));

    // app.route('/repass')
    //     .get(require('./repassGet'))
    //     .post(require('./repass'));
};