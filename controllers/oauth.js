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
      client_id: oauth.facebook.clientId,
      code: req.body.code
    },
    json: true
  })
  .then((token) => {
    return rp({
      method: 'GET',
      url: oauth.facebook.profileURL,
      uri: oauth.facebook.redirectUri,
      qs: token,
      json: true,
      headers: {
        'User-Agent': 'Request-Promise'
      }
    });
  })
  .then((profile) => {
    return User.findOne({ $or: [{ email: profile.email }, { facebookId: profile.id }] })
      .then((user) => {
        if(!user) {
          user = new User({
            username: profile.login,
            email: profile.email
          });
        }

        user.facebookId = profile.id;
        user.image = profile.avatar_url;
        return user.save();
      });
  })
  .then((user) => {
    const payload = { userId: user.id };
    const token = jwt.sign(payload, secret, { expiresIn: '1hr' });

    return res.json({
      token,
      message: `Welcome back ${user.username}`
    });
  })
  .catch(next);
}

module.exports = {
  facebook
};
