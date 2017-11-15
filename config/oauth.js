module.exports = {
  facebook: {
    loginURL: 'https://www.facebook.com/v2.11/dialog/oauth',
    accessTokenURL: 'https://graph.facebook.com/v2.11/oauth/access_token',
    redirectUri: 'https://www.facebook.com/connect/login_success.html',
    profileURL: 'https://graph.facebook.com/v2.11/me?fields=',
    fields: ['id', 'email', 'first_name', 'last_name', 'link', 'picture'],
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    scope: 'user:email'
  }
};
