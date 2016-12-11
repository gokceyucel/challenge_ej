'use strict';

var app = require('../..');
import request from 'supertest';

var newInvite;

describe('Invite API:', function() {
  describe('GET /api/invites', function() {
    var invites;

    beforeEach(function(done) {
      request(app)
        .get('/api/invites')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          invites = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      invites.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/invites', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/invites')
        .send({
          name: 'New Invite',
          info: 'This is the brand new invite!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newInvite = res.body;
          done();
        });
    });

    it('should respond with the newly created invite', function() {
      newInvite.name.should.equal('New Invite');
      newInvite.info.should.equal('This is the brand new invite!!!');
    });
  });

  describe('GET /api/invites/:id', function() {
    var invite;

    beforeEach(function(done) {
      request(app)
        .get(`/api/invites/${newInvite._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          invite = res.body;
          done();
        });
    });

    afterEach(function() {
      invite = {};
    });

    it('should respond with the requested invite', function() {
      invite.name.should.equal('New Invite');
      invite.info.should.equal('This is the brand new invite!!!');
    });
  });

  describe('PUT /api/invites/:id', function() {
    var updatedInvite;

    beforeEach(function(done) {
      request(app)
        .put(`/api/invites/${newInvite._id}`)
        .send({
          name: 'Updated Invite',
          info: 'This is the updated invite!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedInvite = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInvite = {};
    });

    it('should respond with the original invite', function() {
      updatedInvite.name.should.equal('New Invite');
      updatedInvite.info.should.equal('This is the brand new invite!!!');
    });

    it('should respond with the updated invite on a subsequent GET', function(done) {
      request(app)
        .get(`/api/invites/${newInvite._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let invite = res.body;

          invite.name.should.equal('Updated Invite');
          invite.info.should.equal('This is the updated invite!!!');

          done();
        });
    });
  });

  describe('PATCH /api/invites/:id', function() {
    var patchedInvite;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/invites/${newInvite._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Invite' },
          { op: 'replace', path: '/info', value: 'This is the patched invite!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedInvite = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedInvite = {};
    });

    it('should respond with the patched invite', function() {
      patchedInvite.name.should.equal('Patched Invite');
      patchedInvite.info.should.equal('This is the patched invite!!!');
    });
  });

  describe('DELETE /api/invites/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/invites/${newInvite._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when invite does not exist', function(done) {
      request(app)
        .delete(`/api/invites/${newInvite._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
