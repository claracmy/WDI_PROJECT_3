const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./config/routes');
const { db, port, secret } = require('./config/environment');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');
const jwtErrorHandler = require('./lib/jwtErrorHandler');
const cors = require('cors');
const app = express();
const environment = app.get('env');
const expressJWT = require('express-jwt');

const mongoose = require('mongoose');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.Promise = require('bluebird');
mongoose.connect(db[environment], { useMongoClient: true });

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use(
  '/api',
  expressJWT({ secret: secret }).unless({
    path: [
      { url: '/api/files', methods: ['GET'] },
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  })
);

app.use(jwtErrorHandler);

app.use(customResponses);
app.use(errorHandler);
app.use('/api', router);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () =>
  console.log(`Express is up and running on port: ${port}`)
);

module.exports = app;
