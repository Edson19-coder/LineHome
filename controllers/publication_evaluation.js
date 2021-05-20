const PublicationEvaluation = require('../models/publication_evaluation');

function addEvaluation(req, res) {
    var params = req.body;

    if(params.publicationId && params.userId && params.evaluation) {
        const publicationEvaluation = new PublicationEvaluation({
            id: null,
            publicationId: params.publicationId,
            userId: params.userId,
            evaluation: params.evaluation
        });

        PublicationEvaluation.addEvaluation(publicationEvaluation, (error, data) => {
            if(error) return res.status(500).send({message: 'Error al crear la evaluación.'});
            
            if(data) {
                return res.status(200).send(data);
            } else {
                return res.status(404).send({message: 'No se ha guardado la evaluación.'});
            }
        });
    }
}

function getEvaluationByPublication(req, res) {
    var publicationId = req.params.id;

    if(publicationId) {
        PublicationEvaluation.getEvaluationByPublication(publicationId, (error, data) => {
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({message: 'No se ha encontrado la evaluación.'});
                } else {
                    return res.status(500).send({message: 'Error al consultar la evaluación.'});
                }
            } else {
                if(data) {
                    return res.status(200).send(data[0]);
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado la evaluación.' });
                }
            }
        });
    }
}

function getEvaluationByUserAndPublication(req, res) {
    var params = req.params;
 
    if(params.publicationId && params.userId) {
        const publicationEvaluation = new PublicationEvaluation({
            id: null,
            publicationId: params.publicationId,
            userId: params.userId,
            evaluation: null
        });
       

        PublicationEvaluation.getEvaluationByUserAndPublication(publicationEvaluation, (error, data) => {
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({message: 'No se ha encontrado la evaluación.'});
                } else {
                    return res.status(500).send({message: 'Error al consultar la evaluación.'});
                }
            } else {
                if(data) {
                    return res.status(200).send(data);
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado la evaluación.' });
                }
            }
        });
    }
}

function updateEvaluationByUserAndPublication(req, res) {
    var params = req.body;

    if(params.publicationId && params.userId && params.evaluation) {
        const publicationEvaluation = new PublicationEvaluation({
            id: params.id,
            publicationId: params.publicationId,
            userId: params.userId,
            evaluation: params.evaluation
        });

        PublicationEvaluation.updateEvaluationByUser(publicationEvaluation, (error, data) => {
            if(error) return res.status(500).send({message: 'Error al actualizar la evaluación.'});

            if(data) {
                return res.status(200).send(data);
            } else {
                return res.status(404).send({message: 'No se ha actualizado la evaluación.'});
            }
        });
    }
}

module.exports = {
    addEvaluation,
    getEvaluationByPublication,
    getEvaluationByUserAndPublication,
    updateEvaluationByUserAndPublication
}