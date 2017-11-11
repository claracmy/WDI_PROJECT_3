const File = require('../models/file');

function filesIndex (req, res){
  File
    .find()
    .exec()
    .then(files => res.status(200).json(files))
    .catch(() => res.status(500).json({ message: 'something is wrong'}));

}

function filesShow (req, res){
  File
    .findById(req.params.id)
    .exec()
    .then(file => {
      if (!file) return res.status(200).json({ message: 'file not found'});
      return res.status(200).json(file);
    })
    .catch(() => res.status(500).json({ message: 'something went wrong'}));
}

function filesUpdate(req, res){
  File
    .findByIdAndUpdate(req.params.id)
    .exec()
    .then(file => {
      if (!file) return res.status(404).json({ message: 'file not found '});
      return res.status(200).json( { file } );
    })
    .catch(() => res.status(500).json({ message: 'something went wrong' }));
}

function filesDelete(req, res){
  File
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(file => {
      if (!file) return res.status(404).json({ message: 'file not found'});
      return res.sendStatus(204);
    })
    .catch(() => res.status(500).json({ message: 'something went wrong' }));
}

module.exports = {
  index: filesIndex,
  show: filesShow,
  update: filesUpdate,
  delete: filesDelete
};
