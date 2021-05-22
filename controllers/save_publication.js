const SavePublication = require('../models/save_publication');

function addSavePublication(req, res) {
    var params = req.body;

    if(params.userId && params.publicationId) {
        const savePublication = new SavePublication({
            id: null,
            userId: params.userId,
            publicationId: params.publicationId
        });

        SavePublication.addSavePublication(savePublication, (error, data) => {
            if(error) return res.status(500).send({message: 'Error al guardar la publicación.'});
            
            if(data) {
                return res.status(200).send(data);
            } else {
                return res.status(404).send({message: 'No se ha guardado la publicación.'});
            }
        });
    }
}

function deleteSavePublication(req, res) {
    var params = req.body;

    if(params.userId && params.publicationId) {
        const savePublication = new SavePublication({
            id: null,
            userId: params.userId,
            publicationId: params.publicationId
        });

        SavePublication.deleteSavePublication(savePublication, (error, data) => {
            if (error) {
                if (error.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found save publication.`
                  });
                } else {
                  res.status(500).send({
                    message: "Could not delete save publication"
                  });
                }
            } else res.send({ message: `Publicacion borrada!` });
        });
    }
}

function getSavePublicationsByUser(req, res) {
    var userId = req.params.userId;

    if(userId) {
        SavePublication.getSavePublicationsByUser(userId ,(error, data) => {
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({message: 'No se ha encontrado las publicaciones.'});
                } else {
                    return res.status(500).send({message: 'Error al consultar las publicaciones.'});
                }
            } else {
                if(data) {
                    return res.status(200).send(data[0]);
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado las publicaciones.' });
                }
            }
        });
    }
}

function getSavePublicationByUserAndPublication(req, res) {
    var userId = req.params.userId;
    var publicationId = req.params.publicationId;

    if(userId && publicationId) {

        const savePublication = new SavePublication({
            id: null,
            userId: userId,
            publicationId: publicationId
        });

        SavePublication.getSavePublicationByUserAndPublication(savePublication, (error, data) => {
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({message: 'No se ha encontrado las publicaciones.'});
                } else {
                    return res.status(500).send({message: 'Error al consultar las publicaciones.'});
                }
            } else {
                if(data) {
                    return res.status(200).send(data);
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado las publicaciones.' });
                }
            }
        });
    }
}

module.exports = {
    addSavePublication,
    deleteSavePublication,
    getSavePublicationsByUser,
    getSavePublicationByUserAndPublication
}