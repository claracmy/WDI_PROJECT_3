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
          user: {
            username: 'billy',
            email: 'a@a.com',
            passwordHash: 'password'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Thanks for registering.');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('should not register a user with no email', function(done) {
      api
        .post('/api/register')
        .set('Accept','application/json')
        .send({
          user: {
            username: 'billy',
            passwordHash: 'password'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.eq('Validation Error: email: Path email is required');
          expect(res.body.message).to.eq('Bad Request');

          done();
        });
    });
    it('should not register a user with no password', () => {
    });
    it('should not register a user with no password confirmation', () => {
    });

  });
});
