const File = require('../models/file');
const Watson = require('../lib/watson');
//console.log(Watson)

function filesIndex (req, res, next){
  File
    .find()
    .exec()
    .then(files => res.status(200).json(files))
    .catch(next);
}

function filesNew (req, res, next){
  Watson(req)
    .then(result => {
      console.log('result from filesNew', result);
      return File.create({
        filename: req.body.filename,
        //createdBy: req.user,
        html: req.body.html,
        audio: result
      });
    })
    .catch(next);
}

function filesShow (req, res, next){
  File
    .findById(req.params.id)
    .exec()
    .then(file => {
      if (!file) return res.status(200).json({ message: 'file not found'});
      return res.status(200).json(file);
    })
    .catch(next);
}

function filesUpdate(req, res, next){
  File
    .findByIdAndUpdate(req.params.id)
    .exec()
    .then(file => {
      if (!file) return res.status(404).json({ message: 'file not found '});
      return res.status(200).json( { file } );
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

module.exports = {
  index: filesIndex,
  new: filesNew,
  show: filesShow,
  update: filesUpdate,
  delete: filesDelete
};
