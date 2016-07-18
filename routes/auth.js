module.exports = function (req, res, next) {
  if (!req.session.user) {
      res.sendStatus(403)
  } else {
      next()
  }
};