const sql = require("../db/db");

var moment = require('moment');

const Notification = function(notification) {
    this.id = notification.id;
    this.emitter = notification.emitter;
    this.receiver = notification.receiver;
    this.publicationId = notification.publicationId;
    this.createdAt = notification.createdAt;
}

Notification.addNotification = (newNotification, result) => {
    sql.query("INSERT INTO notification SET ?", newNotification, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        newNotification.id = res.insertId;
        //console.log("created evaluation: ", newEvaluation);
        result(null, newNotification);
    });
}

Notification.getNotificationsByReceiver = (receiverId, result) => {
    sql.query(`SELECT n.id, u.userName, u.imageUrl, n.createdAt FROM notification n LEFT JOIN user u ON n.emitter = u.id WHERE n.receiver = ${receiverId}`, (error, res) => {
        if(error) { 
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {

            res.forEach(element => {
                if(element.imageUrl != null) {
                    var buffer = new Buffer.from( element.imageUrl, 'binary' );
                    var bufferBase64 = buffer.toString('base64');
                    element.imageUrl = bufferBase64;
                }
    
                if(element.createdAt) {
                    element.createdAt =  moment.unix(element.createdAt).format("MM/DD/YYYY");
                } 
            });

            //console.log("found user: ", res[0]);
            result(null, res);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

Notification.deleteNotification = ( notificatioId, result) => {
    sql.query(`DELETE FROM notification WHERE id = ${notificatioId};`, 
    (error, res) => {
        if (error) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
    
        //console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

module.exports = Notification;