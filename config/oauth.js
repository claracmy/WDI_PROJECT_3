module.exports = {
  facebook: {
    loginURL: 'https://www.facebook.com/v2.11/dialog/oauth?',
    accessTokenURL: 'https://graph.facebook.com/oauth/authorize?',
    redirectUri: 'https://developers.facebook.com/sa/apps/FACEBOOK_CLIENT_ID',
    profileURL: 'https://api.facebook.com/profile',
    clientId: process.env.FACEBOOK_CLIENT_ID,
    scope: 'user:email'
  }
};
