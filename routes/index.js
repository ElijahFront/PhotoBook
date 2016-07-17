module.exports = function (app) {
    app.post('/login', require('./login').post);

    app.get('/*', function (req, res) {

        res.type('html');

        console.log('Got new request at', req.url);

        var adr = req.url.slice(1);

        res.render(adr);

        res.end();
    });

};