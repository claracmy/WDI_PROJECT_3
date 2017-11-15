const File = require('../models/file');
let i;

function addLike(req, res, next) {
  File
    .findById(req.params.id)
    .exec()
    .then(file => {
      req.body.likedBy = req.user.userId;

      if (file.likes.length > 0) {
        for (i = 0; i < file.likes.length; i++ ) {
          if (String(file.likes[i].likedBy) !== String(req.user.userId)) {
            file.likes.push(req.body);
            file.save();
            return res.status(200).json({ file });
          }
        }
      } else {
        file.likes.push(req.body);
        file.save();
        return res.status(200).json({ file });
      }
    })
    .catch(next);
}

function removeLike(req, res, next) {
  File
    .findById(req.params.id)
    .exec()
    .then(file => {
      console.log('removed');
      if(!file) return res.notFound();
      const like = file.likes.id(req.params.likeId);
      like.remove();
      return file.save();
    })
    .catch(next);
}

module.exports = {
  new: addLike,
  delete: removeLike
};
