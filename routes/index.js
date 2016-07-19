var checkAuth = require('./auth');
var multer  = require('multer');
var uploadUser = multer({ dest: './uploads/usersPhotos' });

module.exports = function (app) {
    app.post('/login',  require('./login').post);
    
    app.post('/logout', checkAuth, require('./logout').post);
    
    app.get('/main', checkAuth, require('./render'));
    
    app.get('/search', checkAuth, require('./render'));
    
    app.get('/album', checkAuth, require('./render'));

    app.get(['/', '/index'], require('./render'));

    app.post('/signUp', require('./signup').post);

    app.post('/profileUpload', uploadUser.array('user_edit'), require('./profileUpload').post)

};