const S3 = require('aws-sdk/clients/s3');
const client = new S3({
  region: 'eu-west-1',
  params: { Bucket: process.env.AWSBucket},
  credentials: {
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
  }
});

function fileUpload(filename, file) {
  return new Promise((resolve, reject) => {
console.log('FILENAME', filename);
    client.upload({
      Key: filename,
      Body: new Buffer(file),
      ContentType: 'application/octet-stream',
      ACL: 'public-read'
    }, (err, body) => {
      console.log('ERROR', err);
      console.log('BODY', body);
      if (err) return reject(err);
      return resolve(body.Location);
    });
  });
}

module.exports = fileUpload;
