var express = require('express');

var UserController = require('../controllers/user');

var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' })

api.post('/addUser', UserController.addUser);
api.post('/getUserByUserOrEmailAndPassword', UserController.getUserByUserOrEmailAndPassword);
api.get('/getUserById/:id', UserController.getUserById);
api.put('/updateUser/:id', UserController.updateUser);
api.post('/uploadImage/:id', UserController.uploadImage);

module.exports = api;