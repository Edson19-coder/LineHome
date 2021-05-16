var express = require('express');

var PublicationPhotoController = require('../controllers/publication_photo');

var api = express.Router();

var multipart = require('connect-multiparty');

api.post('/addPublicationPhoto', PublicationPhotoController.addPublicationPhoto);
api.get('/getPublicationPhotoByPublicationId/:id', PublicationPhotoController.getPublicationPhotoByPublicationId);
api.get('/getFirstImageByPublication/:id', PublicationPhotoController.getFirstImageByPublication);

module.exports = api;