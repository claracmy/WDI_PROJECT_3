const express = require('express');
const router  = express.Router();

const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');
const files           = require('../controllers/files');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/files')
  .get(files.index)
  .post(files.new);
router.route('/files/:id')
  .get(files.show)
  .put(files.update)
  .delete(files.delete);

router.route('/files/:id/comments')
  .post(files.createComment);

router.route('/files/:id/comments/:commentId')
  .delete(files.deleteComment);



module.exports = router;
