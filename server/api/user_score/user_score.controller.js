/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/user_scores              ->  index
 * POST    /api/user_scores              ->  create
 * GET     /api/user_scores/:id          ->  show
 * PUT     /api/user_scores/:id          ->  upsert
 * PATCH   /api/user_scores/:id          ->  patch
 * DELETE  /api/user_scores/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import UserScore from './user_score.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of UserScores
export function index(req, res) {
  return UserScore.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single UserScore from the DB
export function show(req, res) {
  return UserScore.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets UserScores from the DB by user_id
export function showByUserIdEventId(req, res) {
  return UserScore.find({user_id: req.params.user_id, event_id: req.params.event_id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new UserScore in the DB
export function create(req, res) {
  return UserScore.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given UserScore in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return UserScore.findOneAndUpdate({_id: req.params.id}, req.body, {
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing UserScore in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return UserScore.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a UserScore from the DB
export function destroy(req, res) {
  return UserScore.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
