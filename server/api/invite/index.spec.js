'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var inviteCtrlStub = {
  index: 'inviteCtrl.index',
  show: 'inviteCtrl.show',
  create: 'inviteCtrl.create',
  upsert: 'inviteCtrl.upsert',
  patch: 'inviteCtrl.patch',
  destroy: 'inviteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var inviteIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './invite.controller': inviteCtrlStub
});

describe('Invite API Router:', function() {
  it('should return an express router instance', function() {
    inviteIndex.should.equal(routerStub);
  });

  describe('GET /api/invites', function() {
    it('should route to invite.controller.index', function() {
      routerStub.get
        .withArgs('/', 'inviteCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/invites/:id', function() {
    it('should route to invite.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'inviteCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/invites', function() {
    it('should route to invite.controller.create', function() {
      routerStub.post
        .withArgs('/', 'inviteCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/invites/:id', function() {
    it('should route to invite.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'inviteCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/invites/:id', function() {
    it('should route to invite.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'inviteCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/invites/:id', function() {
    it('should route to invite.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'inviteCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
