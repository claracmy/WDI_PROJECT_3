const router = require('express').Router();
const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');
const files           = require('../controllers/files');
const secureRoute = require('../lib/secureRoute');
const oauth = require('../controllers/oauth');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .all(secureRoute)
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/files')
  .get(files.index)
  .post(files.new);
router.route('/files/:id')
  .get(files.show)
  .put(files.update)
  .delete(files.delete);



module.exports = router;
