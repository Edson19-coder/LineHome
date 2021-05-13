var express = require('express');

var UserController = require('../controllers/user');

var api = express.Router();

api.post('/addUser', UserController.addUser);
api.post('/getUserByUserOrEmailAndPassword', UserController.getUserByUserOrEmailAndPassword);
api.get('/getUserById/:id', UserController.getUserById);
api.put('/updateUser/:id', UserController.updateUser);



module.exports = api;