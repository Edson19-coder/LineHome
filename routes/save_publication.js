var express = require('express');

var SavePublication = require('../controllers/save_publication');

var api = express.Router();

api.post('/addSavePublication', SavePublication.addSavePublication);
api.post('/deleteSavePublication', SavePublication.deleteSavePublication);
api.get('/getSavePublicationsByUser/:userId', SavePublication.getSavePublicationsByUser);
api.get('/getSavePublicationByUserAndPublication/:userId/:publicationId', SavePublication.getSavePublicationByUserAndPublication);

module.exports = api;
