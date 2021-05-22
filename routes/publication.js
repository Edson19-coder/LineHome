var express = require('express');

var PublicationController = require('../controllers/publication');

var api = express.Router();

var multipart = require('connect-multiparty');
const Publication = require('../models/publication');
var md_upload = multipart({ uploadDir: './uploads/publications' })

api.post('/addPublication', PublicationController.addPublication);
api.get('/getPublicationById/:id', PublicationController.getPublicationById);
api.get('/getPublications', PublicationController.getPublications);
api.post('/updatePublicationById/:id', PublicationController.updatePublicationById);
api.get('/getPublicationByOwner/:id', PublicationController.getPublicationByOwner);
api.post('/getSearchPublication', PublicationController.getSearchPublication);

module.exports = api;