var express = require('express');

var Notification = require('../controllers/notification');

var api = express.Router();

api.post('/addNotification', Notification.addNotification);
api.post('/deleteNotification/:id', Notification.deleteNotification);
api.get('/getNotificationsByReceiver/:receiverId', Notification.getNotificationsByReceiver);

module.exports = api;