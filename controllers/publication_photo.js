const PublicationPhoto = require('../models/publication_photo');

function addPublicationPhoto(req, res) {
    var params = req.body;

    if(params.publicationId && params.image) {
        const base64Decode = Buffer.from(params.image, "base64");

        const publicationPhoto = new PublicationPhoto({
            id: null,
            publicationId: params.publicationId,
            image: base64Decode
        })

        PublicationPhoto.addPublicationPhoto(publicationPhoto, (error, data) => {
            if(error) return res.status(500).send({message: 'Error al subir la foto de la publicación.'});
            
            if(data) {
                return res.status(200).send(data);
            } else {
                return res.status(404).send({message: 'No se ha guardado la foto.'});
            }
        });
    } else {
        return res.status(200).send({message: 'Ingresa los datos faltantes.'});
    }
}

function getPublicationPhotoByPublicationId(req, res) {
    var publicationId = req.params.id;

    if(publicationId) {
        PublicationPhoto.getPublicationPhotoByPublicationId(publicationId, (error, data) => {
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({message: 'No se ha encontrado la imagen.'});
                } else {
                    return res.status(500).send({message: 'Error al consultar la imagen.'});
                }
            } else {
                if(data) {
                    return res.status(200).send(data);
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado la imagen.' });
                }
            }
        });
    }
}

function getFirstImageByPublication(req, res) {
    var publicationId = req.params.id;
    
    if(publicationId) {
        PublicationPhoto.getFirstImageByPublication(publicationId, (error, data) => {
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({message: 'No se ha encontrado la imagen.'});
                } else {
                    return res.status(500).send({message: 'Error al consultar la imagen.'});
                }
            } else {
                if(data) {
                    return res.status(200).send(data);
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado la imagen.' });
                }
            }
        });
    }
}

module.exports = {
    addPublicationPhoto,
    getPublicationPhotoByPublicationId,
    getFirstImageByPublication
}