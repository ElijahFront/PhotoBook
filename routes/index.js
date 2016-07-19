var checkAuth = require('./auth');

module.exports = function (app) {
    app.post('/login', checkAuth,  require('./login').post);
    
    app.post('/logout', checkAuth, require('./logout').post);
    
    app.get('/main', checkAuth, require('./render'));
    
    app.get('/search', checkAuth, require('./render'));
    
    app.get('/album', checkAuth, require('./render'));

    app.get(['/', '/index'], require('./render'));
    
    app.post('/signUp', require('./signup').post);

    app.post('/profileUpload', require('./profileUpload'))

};