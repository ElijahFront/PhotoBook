var checkAuth = require('./auth');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        var name = file.originalname.replace((/\s+/g, ''));
        cb(null, Date.now() + '_' + name)
    }
});

var uploadUser = multer({ storage: storage });

module.exports = function (app) {
    app.post('/login', checkAuth,  require('./login').post);
    app.post('/logout', checkAuth, require('./logout').post);
    app.post('/signUp', require('./signup').post);
    app.post('/profileUpload', uploadUser.array('inputs__names'), require('./profileUpload').post);
    app.post('/newAlbum', require('./newAlbum').post);
    
    app.get(['/confirm/:conf'], require('./confirm'));
    app.get('/main', checkAuth, require('./render'));
    app.get('/user/:id', require('./users').get);
    app.get('/user/:id/albums/:album', checkAuth, require('./albums').get);
    app.get('/search', checkAuth, require('./render'));
    app.get('/album', checkAuth, require('./render'));
    app.get(['/', '/index'], require('./render'));
    //app.get('/albums/:id', require('./albums'))

};