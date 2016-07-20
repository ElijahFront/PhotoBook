var checkAuth = require('./auth');
var multer  = require('multer');
var uploadUser = multer();

module.exports = function (app) {
    app.post('/login',  require('./login').post);
    
    app.post('/logout', checkAuth, require('./logout').post);
    
    app.get('/main', checkAuth, require('./render'));
    
    app.get('/search', checkAuth, require('./render'));
    
    app.get('/album', checkAuth, require('./render'));

    app.get(['/', '/index'], require('./render'));

    app.post('/signUp', require('./signup').post);

    app.post('/profileUpload', uploadUser.single('upl'), require('./profileUpload').post)

};