const Notification = require('../models/notification');

var moment = require('moment');

function addNotification(req, res) {
    var params = req.body;

    if(params.emitter && params.receiver && params.publicationId) {
        const notification = new Notification({
            id: null,
            emitter: params.emitter,
            receiver: params.receiver,
            publicationId: params.publicationId,
            createdAt: moment().unix()
        });

        Notification.addNotification(notification, (error, data) => {
            if(error) return res.status(500).send({message: 'Error al crear la notificación.'});
            
            if(data) {
                return res.status(200).send(data);
            } else {
                return res.status(404).send({message: 'No se ha guardado la notificación.'});
            }
        });
    }
}

function deleteNotification(req, res) {
    var id = req.params.id;

    if(id) {
        Notification.deleteNotification(id, (error, data) => {
            if (error) {
                if (error.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found save notification.`
                  });
                } else {
                  res.status(500).send({
                    message: "Could not delete save notification"
                  });
                }
            } else res.send({ message: `Notificación borrada!` });
        });
    }
}

function getNotificationsByReceiver(req, res) {
    var receiverId = req.params.receiverId;
    if(receiverId) {
        Notification.getNotificationsByReceiver(receiverId ,(error, data) => {
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({message: 'No se ha encontrado las notificaciones.'});
                } else {
                    return res.status(500).send({message: 'Error al consultar las notificaciones.'});
                }
            } else {
                if(data) {
                    return res.status(200).send(data);
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado las notificaciones.' });
                }
            }
        });
    }
}

module.exports = {
    addNotification,
    deleteNotification,
    getNotificationsByReceiver
}