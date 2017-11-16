const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Watson = require('../lib/watson');

const { db, env } = require('../config/environment');
mongoose.connect(db[env], { useMongoClient: true });

const User = require('../models/user');
const File = require('../models/file');

const filesWithAudio = [];

User.collection.drop();
File.collection.drop();

User
  .create([{
    username: 'Rocky',
    email: 'rocky@rocky.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);


    // create array for files
    const fileArray = [{
      filename: 'CocoChanel',
      html: 'Coco Chanel once said that you should put perfume on places where you want to be kissed by a man. But hell does that burn!',
      createdBy: users[0]
    }, {
      filename: 'Yo mama\'s so dumb',
      html: 'Yo momma\'s so dumb, when she went to the movies and saw the "Under 17 not permitted" sign, she left to get 16 of her friends.',
      createdBy: users[0]
    }, {
      filename: 'Yo mama\'s so dumb',
      html: 'Yo momma\'s so dumb, when she saw the "Disneyland left" sign, she went home.',
      createdBy: users[0]
    }, {
      filename: 'Yo mama\'s so fat',
      html: 'Yo momma\'s so fat, when God said "Let there be light," he asked her to move out of the way.',
      createdBy: users[0]
    }, {
      filename: 'Yo mama\'s so old',
      html: 'Yo momma\'s so old, her social security number is one.',
      createdBy: users[0]
    }];

    fileArray.forEach(file => {
      const req = {
        body: file
      };

      Watson(req)
        .then(res => {
          file.audio = res;
          filesWithAudio.push(file);
        })
        .then(() => {
          if (filesWithAudio.length === fileArray.length) {
            File.create(filesWithAudio, function(err, files) {
              console.log('files were save', files[0].audio);
              mongoose.connection.close();
            });
          }
        });
    });
  })
  .catch((err) => console.log(err));
