function jwtErrorHandler(err, req, res, next) {
  if (err.name !== 'UnauthorizedError') return next();
  return res.status(401).json({ message: 'YOu must be logged in to view this content'});
}

module.exports = jwtErrorHandler;
