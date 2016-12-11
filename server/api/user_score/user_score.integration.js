'use strict';

var app = require('../..');
import request from 'supertest';

var newUserScore;

describe('UserScore API:', function() {
  describe('GET /api/user_scores', function() {
    var userScores;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_scores')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          userScores = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      userScores.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/user_scores', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/user_scores')
        .send({
          name: 'New UserScore',
          info: 'This is the brand new userScore!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newUserScore = res.body;
          done();
        });
    });

    it('should respond with the newly created userScore', function() {
      newUserScore.name.should.equal('New UserScore');
      newUserScore.info.should.equal('This is the brand new userScore!!!');
    });
  });

  describe('GET /api/user_scores/:id', function() {
    var userScore;

    beforeEach(function(done) {
      request(app)
        .get(`/api/user_scores/${newUserScore._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          userScore = res.body;
          done();
        });
    });

    afterEach(function() {
      userScore = {};
    });

    it('should respond with the requested userScore', function() {
      userScore.name.should.equal('New UserScore');
      userScore.info.should.equal('This is the brand new userScore!!!');
    });
  });

  describe('PUT /api/user_scores/:id', function() {
    var updatedUserScore;

    beforeEach(function(done) {
      request(app)
        .put(`/api/user_scores/${newUserScore._id}`)
        .send({
          name: 'Updated UserScore',
          info: 'This is the updated userScore!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedUserScore = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserScore = {};
    });

    it('should respond with the original userScore', function() {
      updatedUserScore.name.should.equal('New UserScore');
      updatedUserScore.info.should.equal('This is the brand new userScore!!!');
    });

    it('should respond with the updated userScore on a subsequent GET', function(done) {
      request(app)
        .get(`/api/user_scores/${newUserScore._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let userScore = res.body;

          userScore.name.should.equal('Updated UserScore');
          userScore.info.should.equal('This is the updated userScore!!!');

          done();
        });
    });
  });

  describe('PATCH /api/user_scores/:id', function() {
    var patchedUserScore;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/user_scores/${newUserScore._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched UserScore' },
          { op: 'replace', path: '/info', value: 'This is the patched userScore!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedUserScore = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedUserScore = {};
    });

    it('should respond with the patched userScore', function() {
      patchedUserScore.name.should.equal('Patched UserScore');
      patchedUserScore.info.should.equal('This is the patched userScore!!!');
    });
  });

  describe('DELETE /api/user_scores/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/user_scores/${newUserScore._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userScore does not exist', function(done) {
      request(app)
        .delete(`/api/user_scores/${newUserScore._id}`)
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
