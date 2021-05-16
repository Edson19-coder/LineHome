const Publication = require('../models/publication');

function addPublication(req, res) {
    var params = req.body;

    if(params.titlePublication && params.description && params.price && params.location && params.category && params.owner) {
        const publication = new Publication({
            id: null,
            titlePublication: params.titlePublication,
            description: params.description,
            price: params.price,
            location: params.location,
            category: params.category, 
            owner: params.owner 
        })

        Publication.addPublication(publication, (error, data) => {
            if(error) return res.status(500).send({message: 'Error al crear la publicación.'});

            if(data) {
                return res.status(200).send(data);
            } else {
                return res.status(404).send({message: 'No se ha creado la publicacioón.'});
            }
        });

    } else {
        return res.status(200).send({message: 'Ingresa los datos faltantes.'});
    }
}

function getPublicationById(req, res) {
    var publicationId = req.params.id;

    if(publicationId) {
        Publication.getPublicationById(publicationId, (error, data) => {
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({message: 'No se ha encontrado la publicación.'});
                } else {
                    return res.status(500).send({message: 'Error al consultar la publicación.'});
                }
            } else {
                if(data) {
                    return res.status(200).send(data);
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado la publicación.' });
                }
            }
        });
    }
}

function getPublications(req, res) {
    Publication.getPublications((error, data) => {
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

function updatePublicationById(req, res) {
    var publicationId = req.params.id;
    var update = req.body;

    if(update.titlePublication && update.description && update.price && update.location && update.category) {
        const publication = new Publication({
            id: publicationId,
            titlePublication: update.titlePublication,
            description: update.description,
            price: update.price,
            location: update.location,
            category: update.category, 
            owner: null 
        })

        Publication.updatePublicationById(publication, (error, data) => {
            if(error) return res.status(500).send({message: 'Error al actualizar la publicación.'});

            if(data) {
                return res.status(200).send(data);
            } else {
                return res.status(404).send({message: 'No se ha actualizado la publicacioón.'});
            }
        });

    } else {
        return res.status(200).send({message: 'Ingresa los datos faltantes.'});
    }
}

function getPublicationByOwner(req, res) {
    var ownerId = req.params.id;

    if(ownerId) {
        Publication.getPublicationByOwner(ownerId, (error, data) => {
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
    addPublication,
    getPublicationById,
    getPublications,
    updatePublicationById,
    getPublicationByOwner
}