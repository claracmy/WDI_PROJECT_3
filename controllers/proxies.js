// const fs = require('fs');
// const watson = require('watson-developer-cloud');
// const rp = require('request-promise');
// let watsonToken = '';
//
// function watsonFunction() {
//   getWatsonToken();
// }
//
// function getWatsonToken(req, res) {
//
//   var authorization = new watson.AuthorizationV1({
//     username: 'd643b333-42a6-4c0c-a04d-65d946d7b203',
//     password: 'nQfY6cXErZ8v',
//     url: watson.TextToSpeechV1.URL
//   });
//
//   authorization.getToken(function (err, token) {
//     if (!token) {
//       console.log('no token:', err);
//     } else {
//       watsonToken = token;
//       console.log(watsonToken);
//       askWatson();
//     }
//   });
// }
//
// function askWatson(req, res) {
//
//   var options = {
//     method: 'POST',
//     uri: 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize',
//     headers: {
//       'X-Watson-Authorization-Token': `${watsonToken}`,
//       'Content-Type': 'application/json',
//       'Accept': 'audio/wav'
//     },
//     body: {
//       text: 'Hello Guys How Are you'
//     },
//     json: true
//   };
//   rp(options)
//     .then(function (audio) {
//       fs.writeFileSync('audio.wav', repairWavHeader(audio));
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }
//
// /**
//  * Repair the WAV header of an audio/wav file.
//  *
//  * @param {Buffer} wavFileData - Wave audio - will be edited in place and returned
//  * @return {Buffer} wavFileData - the original Buffer, with a correct header
//  */
//
// function repairWavHeader(wavFileData) {
//   const totalBytes = wavFileData.length;
//
//   // bytes 4-8 in header give the total file size,
//   // after the first 8 bytes
//   // this is a reliable constant
//   const chunkSize = totalBytes - 8;
//   wavFileData.writeInt32LE(chunkSize, 4);
//
//   // the first subchunk is at byte 12, the fmt subchunk
//   // this is the only other reliable constant
//   let chunkIdOffset = 12;
//   const fieldSize = 4;
//
//   // every subchunk has a 4 byte id followed by a 4 byte size field
//   let chunkSizeOffset = chunkIdOffset + fieldSize;
//   let subchunk2sizeLocation = 0;
//
//   // initialize values to hold data of each chunk we come across
//   let tempChunkID = '';
//   let tempChunkSize = 0;
//
//   while (tempChunkID !== 'data') {
//     if (chunkSizeOffset + fieldSize > totalBytes) {
//       break;
//     }
//
//     tempChunkID = wavFileData.slice(chunkIdOffset, chunkIdOffset + fieldSize).toString('ascii');
//     tempChunkSize = wavFileData.readInt32LE(chunkSizeOffset);
//
//     // save the location of the data size field
//     if (tempChunkID === 'data') {
//       subchunk2sizeLocation = chunkSizeOffset;
//     }
//
//     // skip over all the data in the temp chunk
//     chunkIdOffset = chunkSizeOffset + fieldSize + tempChunkSize;
//     chunkSizeOffset = chunkIdOffset + fieldSize;
//   }
//
//   const subchunk2size = totalBytes - subchunk2sizeLocation - fieldSize;
//
//   // update the size of the audio data and return
//   wavFileData.writeInt32LE(subchunk2size, subchunk2sizeLocation);
//
//   return wavFileData;
// }

const File = require('../models/file');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');

function watsonFunction(req, res) {
  // File
  //   .find
// console.log(req.body);
  const textToSpeech = new TextToSpeechV1({
    username: 'd643b333-42a6-4c0c-a04d-65d946d7b203',
    password: 'nQfY6cXErZ8v'
  });

  const params = {
    text: 'hello',
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
      fs.writeFileSync('audio.wav', audio);
    });
}

module.exports = {
  watson: watsonFunction
};
