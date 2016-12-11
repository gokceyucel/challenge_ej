'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userScoreCtrlStub = {
  index: 'userScoreCtrl.index',
  show: 'userScoreCtrl.show',
  create: 'userScoreCtrl.create',
  upsert: 'userScoreCtrl.upsert',
  patch: 'userScoreCtrl.patch',
  destroy: 'userScoreCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userScoreIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './user_score.controller': userScoreCtrlStub
});

describe('UserScore API Router:', function() {
  it('should return an express router instance', function() {
    userScoreIndex.should.equal(routerStub);
  });

  describe('GET /api/user_scores', function() {
    it('should route to userScore.controller.index', function() {
      routerStub.get
        .withArgs('/', 'userScoreCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/user_scores/:id', function() {
    it('should route to userScore.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'userScoreCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/user_scores', function() {
    it('should route to userScore.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userScoreCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/user_scores/:id', function() {
    it('should route to userScore.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'userScoreCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/user_scores/:id', function() {
    it('should route to userScore.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'userScoreCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/user_scores/:id', function() {
    it('should route to userScore.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'userScoreCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
