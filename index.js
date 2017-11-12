const express         = require('express');
const morgan          = require('morgan');
const bodyParser      = require('body-parser');
const router          = require('./config/routes');
const { db, port }    = require('./config/environment');
const customResponses = require('./lib/customResponses');
const errorHandler    = require('./lib/errorHandler');
const cors            = require('cors');

const app             = express();
const environment     = app.get('env');

const multer          = require('multer'); // this is for uploading files
const storage         = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/uploads/images/');
  },
  filename: function(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { // if file format is not png or..., then throw error
      const err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
      cb(null, Date.now() + '_' + file.originalname); // error is set to null, datenow to give the file a unique name
    }
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }

}).single('myfile');


const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
mongoose.connect(db[environment], { useMongoClient: true });

// WATSON ----------------------------------------------------------------------

// const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
// const fs = require('fs');

// app.get('/', useWatson);
//
// function useWatson(req, res) {
//   console.log('watson running');
//   var text_to_speech = new TextToSpeechV1 ({
//     username: 'USERNAME_HERE',
//     password: 'PASSWORD_HERE'
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

// WATSON END ------------------------------------------------------------------

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use(customResponses);
app.use('/api', router);

// FILE UPLOAD ROUTE -----------------------------------------------------------

app.post('/upload', function (req, res) {
  console.log('upload fired');
  upload(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') { // error code types are given by multer
        res.json({
          success: false,
          message: 'File size is too large. Max limit is10 MB.'
        });
      } else if (err.code === 'filetype') { // uploaded file is in unautorized format, error we created
        res.json({
          success: false,
          message: 'File type is invalid. Must be .png/ .jpg/ or .jpeg.'
        });
      } else { // any other error
        console.log(err);
        res.json({
          success: false,
          message: 'File was not able to be uploaded.'
        });
      }
    } else {
      if (!req.file) { // if there is no file in the request
        res.json({
          success: false,
          message: 'No file was selected.'
        });
      } else { // if all is good
        res.json({
          success: true,
          message: 'File was successfully uploaded!'
        });
      }
    }
  });
});

// FILE UPLOAD ROUTE END -------------------------------------------------------

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express is up and running on port: ${port}`));

module.exports = app;
