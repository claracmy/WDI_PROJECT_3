const File = require('../models/file');
const User = require('../models/user');


function addLike(req, res, next) {
  File
    .findById(req.params.id)
    .populate('likes')
    .exec()
    .then(file => {
      req.body.likedBy = req.user.userId;

    }
}

function removeLike(req, res, next) {

}

module.exports = {
  new: addLike,
  delete: removeLike
};
