const File = require('../models/file');

function addLike(req, res, next) {
  File
    .findById(req.params.id)
    .exec()
    .then(file => {
      file.likes.addToSet(req.user.userId);
      return file.save();
    })
    .then(file => res.status(200).json(file))
    .catch(next);
}

function removeLike(req, res, next) {
  File
    .findById(req.params.id)
    .exec()
    .then(file => {
      file.likes.remove(req.user.userId);
      return file.save();
    })
    .then(file => res.status(200).json(file))
    .catch(next);
}
module.exports = {
  new: addLike,
  delete: removeLike
};
