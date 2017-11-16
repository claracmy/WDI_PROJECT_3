const router          = require('express').Router();
const authentications = require('../controllers/authentications');
const oauth           = require('../controllers/oauth');
const users           = require('../controllers/users');
const files           = require('../controllers/files');
const likes           = require('../controllers/likes');
const secureRoute     = require('../lib/secureRoute');

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
router.route('/users/:id/files')
  .get(users.showFiles);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/files')
  .get(files.index)
  .post(files.new);
router.route('/files/:id')
  .get(files.show)
  .put(files.update)
  .delete(files.delete);

router.route('/files/:id/likes')
  .post(likes.new);

router.route('/files/:id/comments')
  .post(files.createComment);
router.route('/files/:id/comments/:commentId')
  .delete(files.deleteComment);

module.exports = router;
