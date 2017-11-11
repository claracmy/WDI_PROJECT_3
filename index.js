const express         = require('express');
const morgan          = require('morgan');
const bodyParser      = require('body-parser');
const router          = require('./config/routes');
const { db, port }    = require('./config/environment');
const customResponses = require('./lib/customResponses');
const errorHandler    = require('./lib/errorHandler');

const app             = express();
const environment      = app.get('env');

// const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
// const fs = require('fs');

const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
mongoose.connect(db[environment], { useMongoClient: true });


// app.get('/', useWatson);
//
// function useWatson(req, res) {
//   console.log('watson running');
//   var text_to_speech = new TextToSpeechV1 ({

//   });
//
//   var params = {
//     text: 'Hello clara',
//     voice: 'en-US_AllisonVoice',
//     accept: 'audio/wav'
//   };
//
//   // Pipe the synthesized text to a file.
//   text_to_speech.synthesize(params).on('error', function(error) {
//     console.log('Error:', error);
//   }).pipe(fs.createWriteStream('hello_clara.wav'));
// }

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use(customResponses);
app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express is up and running on port: ${port}`));

module.exports = app;
