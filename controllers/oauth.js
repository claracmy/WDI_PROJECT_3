const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function facebook(req, res, next) {
  return rp({
    method: 'POST',
    url: oauth.facebook.accessTokenURL,
    qs: {
      code: req.body.code,
      client_id: oauth.facebook.clientId,
      client_secret: oauth.facebook.clientSecret,
      redirect_uri: req.body.redirectUri
    },
    json: true
  })
    .then(token => {
      return rp({
        method: 'GET',
        url: `${oauth.facebook.profileURL}${oauth.facebook.fields.join(',')}`,
        qs: token,
        json: true,
        headers: {
          'User-Agent': 'Request-Promise'
        }
      });
    })
    .then(profile => {
      req._profile = profile;
      return User.findOne({
        $or: [{ email: profile.email }, { facebookId: profile.id }]
      });
    })
    .then(user => {
      if (!user) {
        user = new User({
          username: req.profile.first_name,
          email: req.profile.email
        });
      }
      user.facebookId = req.profile.id;
      user.image =
        req.profile.picture &&
        req.profile.picture.data &&
        req.profile.picture.data.url;
      return user.save();
    })
    .then(user => {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, secret, { expiresIn: '1hr' });
      return res.json({
        token,
        user,
        message: `Welcome back ${user.username}`
      });
    })
    .catch(next);
}

module.exports = {
  facebook
};
