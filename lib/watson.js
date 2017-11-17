const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fileUpload = require('../lib/fileUpload');

module.exports = req => {
  return new Promise((resolve, reject) => {
    const textToSpeech = new TextToSpeechV1({
      username: '5df811b6-c376-40f6-a15b-fed524e1abf8',
      password: '3KVhOTQ8UUYv'
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
