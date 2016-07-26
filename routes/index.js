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
    app.post('/login', checkAuth,  require('./login').post);
    app.post('/logout', checkAuth, require('./logout').post);
    app.post('/signUp', require('./signup').post);
    app.post('/profileUpload', uploadUser.array('inputs__names'), require('./profileUpload').post);
    app.post('/createAlbum', createAlb.array('addAlbum'), require('./newAlbum').post);
    app.post('/albums/:id/addPhoto', createAlb.single('addPhoto'), require('./newPhoto').post);

    app.get(['/confirm/:conf'], require('./confirm'));
    app.get('/main', checkAuth, require('./main'));
    app.get('/user/:id', require('./users').get);
    app.get('/user/:id/albums/:album', checkAuth, require('./albums').get);
    app.get('/search', checkAuth, require('./render'));
    app.get('/album', checkAuth, require('./render'));
    app.get(['/', '/index'], require('./render'));
    app.get('/albums/:id', require('./albums'));

    app.route('/repass')
        .get(require('./repassGet'))
        .post(require('./repass'));
};