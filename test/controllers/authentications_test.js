/* globals describe, it, api, afterEach, beforeEach, expect */
require('../spec_helper');
const User = require('../../models/user');


describe('Authentications', function() {

  beforeEach(done => {
    User.collection.drop();
    done();
  });

  describe('POST /api/register', function() {

    it('should register a user with the correct credentials', function(done) {
      api
        .post('/api/register')
        .set('Accept','application/json')
        .send({

          username: 'Billy',
          email: 'a@a.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Welcome Billy!');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('should not register a user with no email', function(done) {
      api
        .post('/api/register')
        .set('Accept','application/json')
        .send({
          username: 'billy',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.eq('ValidationError: email: Path `email` is required.');
          expect(res.body.message).to.eq('Bad Request');

          done();
        });
    });
    it('should not register a user with no password', function(done) {
      api
        .post('/api/register')
        .set('Accept','application/json')
        .send({
          username: 'billy',
          email: 'a@a.com',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.eq('ValidationError: passwordHash: Path `passwordHash` is required.');
          expect(res.body.message).to.eq('Bad Request');

          done();
        });
    });

    it('should not register a user with no password Confirmation', function(done) {
      api
        .post('/api/register')
        .set('Accept','application/json')
        .send({
          username: 'billy',
          email: 'a@a.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.eq('ValidationError: passwordConfirmation: Passwords do not match.');
          expect(res.body.message).to.eq('Bad Request');

          done();
        });
    });
  });
});
