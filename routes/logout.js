exports.post = function (req, res) {
    req.session.destroy();
    res.sendStatus(200);
    res.end()
};