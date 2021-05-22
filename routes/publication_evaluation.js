var express = require('express');

var EvaluationController = require('../controllers/publication_evaluation');

var api = express.Router();

var multipart = require('connect-multiparty');

api.post('/addEvaluation', EvaluationController.addEvaluation);
api.get('/getEvaluationByPublication/:id', EvaluationController.getEvaluationByPublication);
api.get('/getEvaluationByUserAndPublication/:publicationId/:userId', EvaluationController.getEvaluationByUserAndPublication);
api.post('/updateEvaluationByUserAndPublication', EvaluationController.updateEvaluationByUserAndPublication);

module.exports = api;