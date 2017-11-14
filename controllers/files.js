const File = require('../models/file');
const Watson = require('../lib/watson');


function filesIndex (req, res, next){
  File
    .find()
    .exec()
    .then(files => res.status(200).json(files))
    .catch(next);
}

function filesNew (req, res, next){
  console.log('this this created by: ', req.body.createdBy);


  Watson(req)
    .then(result => {
      return File.create({
        filename: req.body.filename,
        createdBy: req.body.createdBy,
        html: req.body.html,
        audio: result
      });
    })
    .then((file) => console.log(file))
    .catch(next);
}

function filesShow (req, res, next){
  File
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(file => {
      if (!file) return res.status(200).json({ message: 'file not found'});
      console.log(file);
      return res.status(200).json(file);
    })
    .catch(next);
}

function filesUpdate(req, res, next){
  console.log(req.body);
  File
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(file => {
      if (!file) return res.status(404).json({ message: 'file not found '});
      return res.status(200).json(file);
    })
    .catch(next);
}

function filesDelete(req, res, next){
  File
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(file => {
      if (!file) return res.status(404).json({ message: 'file not found'});
      return res.sendStatus(204);
    })
    .catch(next);
}

function commentsCreate(req, res, next) {
// console.log(req.body);

  File
    .findById(req.params.id)
    .exec()
    .then(file => {
// console.log('this is req.user.userId', req.user.userId);
console.log('this is req.params.id', req.params.id); //:5a0af615d65d159eabe73d8d <= id of the file as it is the same as vm.file._id on the front-end
console.log('this is req.user', req.user); //:undefined
console.log('this is req.params', req.params);//: { id: 5a0af615d65d159eabe73d8d}
// req.user.userId should be the vm.file.createdBy
      if(!file) return res.notFound();
      req.body.createdBy = req.user.userId; //this is the original line
      // req.body.createdBy = req.params.id;
console.log('this is req.body', req.body);
      file.comments.push(req.body);
      file.save();
      return res.status(200).json({ file });
    })
    .catch(next);
}

function commentsDelete(req, res, next){
  File
    .findById(req.params.id)
    .exec()
    .then(file => {
      if (!file) return res.notFound();
      // req.body.createdBy = req.user.userId;
      const comment = file.comments.id(req.params.commentId);
      comment.remove();

      return file.save();
    })
    .catch(next);
}

module.exports = {
  index: filesIndex,
  new: filesNew,
  show: filesShow,
  update: filesUpdate,
  delete: filesDelete,
  createComment: commentsCreate,
  deleteComment: commentsDelete
};
