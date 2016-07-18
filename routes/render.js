module.exports = function (req, res) {

    res.type('html');

    console.log('Got new request at', req.url);

    var adr = req.url.slice(1);

    res.render(adr);
    
};