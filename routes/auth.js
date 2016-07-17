module.exports = function (req, res, next) {
  if (!req.session.user) {
      res.send(403)
  } else {
      next()
  }
};