const File = require('../models/file');
let watsonText;
let watsonFilename;

function filesIndex (req, res){
  File
    .find()
    .exec()
    .then(files => res.status(200).json(files))
    .catch(() => res.status(500).json({ message: 'something is wrong'}));

}

function filesNew (req, res, next){
  req.body.createdBy = req.user;
  watsonText = req.body.html;
  watsonFilename = req.body.filename;
  console.log(req.body);
  File
    .create(req.body)
    .then((file) => {
      watsonFunction();
      res.status(201).json(file);
    })
    .catch(next);
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

const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');

function watsonFunction(req, res) {

  const textToSpeech = new TextToSpeechV1({
    username: 'd643b333-42a6-4c0c-a04d-65d946d7b203',
    password: 'nQfY6cXErZ8v'
  });

  const params = {
    text: `${watsonText}`,
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav'
  };

  textToSpeech
    .synthesize(params, function(err, audio) {
      if (err) {
        console.log(err);
        return;
      }
      textToSpeech.repairWavHeader(audio);
      fs.writeFileSync(`${watsonFilename}.wav`, audio);
    });
}

module.exports = {
  index: filesIndex,
  new: filesNew,
  show: filesShow,
  update: filesUpdate,
  delete: filesDelete
};
