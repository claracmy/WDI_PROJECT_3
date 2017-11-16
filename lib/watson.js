const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fileUpload = require('../lib/fileUpload');

module.exports = req => {
  return new Promise((resolve, reject) => {
    const textToSpeech = new TextToSpeechV1({
      username: 'd643b333-42a6-4c0c-a04d-65d946d7b203',
      password: 'nQfY6cXErZ8v'
    });

    const params = {
      text: `${req.body.html}`,
      voice: 'en-US_MichaelVoice', // Optional voice
      accept: 'audio/wav'
    };

    textToSpeech
      .synthesize(params, function(err, audio) {
        if (err) {
          console.log(err);
          return;
        }
        textToSpeech.repairWavHeader(audio);
        fileUpload(`${req.body.filename}.wav`, audio)
          .then(resolve)
          .catch(reject);
      });
  });
};
