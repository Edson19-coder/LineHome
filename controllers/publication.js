const Publication = require('../models/publication');

var moment = require('moment');

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
            owner: params.owner,
            createdAt: moment().unix()
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
            owner: null, 
            createdAt: null
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

function getSearchPublication(req, res) {
    var params = req.body;
    var text = params.text;
    var categorie = params.categorie;
    var location = params.location;

    console.log(req.body);

    if(text == "" || text == " ") text = null;
    if(categorie == "" || categorie == " ") categorie = null;
    if(location == "" || location == " ") location = null;

    Publication.getSearchPublication({text: text, categorie: categorie, location: location}, (error, data) => {
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

module.exports = {
    addPublication,
    getPublicationById,
    getPublications,
    updatePublicationById,
    getPublicationByOwner,
    getSearchPublication
}