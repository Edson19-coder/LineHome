const User = require('../models/user');

function addUser(req, res) {
	var params = req.body;

    if(params.userName && params.email && params.password) {
        const user = new User({ 
            id: null,
            userName: params.userName, 
            email: params.email, 
            password: params.password, 
            imageUrl: null 
        });

        User.checkRegisterUser(user, (error, data) => {
            if(error) {
                if(error.kind === "not_found") {

                    User.addUser(user, (error, data) => {
            
                        if(error) return res.status(500).send({ message: 'Error al crear el usuario' } );
            
                        if(data) { 
                            return res.status(200).send({ user:data }); 
                        } else {
                            return res.status(404).send({ message: 'No se ha registrado el usuario.' });
                        }
            
                    });

                } else {
                    return res.status(500).send({ message: 'Error al validar la existencia del usuario' } );
                }
            } else {
                return res.status(200).send({ message: 'Esta cuenta ya existe.'})
            }
        });
        
    } else {
        res.status(200).send({ message: params.userName });
    }
}

function getUserByUserOrEmailAndPassword(req, res) {
    var params = req.body;

    if(params.email && params.password) {
        
        const user = new User({
            id: null,
            userName: params.email,
            email: params.email, 
            password: params.password,
            imageUrl: null
        });

        User.getUserByUserOrEmailAndPassword(user, (error, data) => {
            
            if(error) {
                if(error.kind === "not_found") {
                    return res.status(404).send({ message: 'No se ha encontrado el usuario.' });
                } else {
                    return res.status(500).send({ message: 'Error al consultar el usuario' } );
                }
            } else {
                if(data) {
                    return res.status(200).send({ data }); 
                } else {
                    return res.status(404).send({ message: 'No se ha encontrado el usuario.' });
                }
            }
        });
    }
}

function getUserById(req, res) {
    var userId = req.params.id;

    User.getUserById(userId, (error, data) => {
        if(error) {
            if(error.kind === "not_found") {
                return res.status(404).send({ message: 'No se ha encontrado el usuario.' });
            } else {
                return res.status(500).send({ message: 'Error al consultar el usuario' } );
            }
        } else {
            if(data) {
                return res.status(200).send(data); 
            } else {
                return res.status(404).send({ message: 'No se ha encontrado el usuario.' });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
	var update = req.body;
    update.id = userId
	
    if (!update) {
        res.status(400).send({ message: "El contenido no puede ser vacio!" });
    }

    User.updateUser(update, (error, data) => {
        if(error) {
            if(error.kind === "not_found") {
                return res.status(404).send({ message: 'No se ha encontrado el usuario.' });
            } else {
                return res.status(500).send({ message: 'Error al actualizar el usuario' } );
            }
        } else {
            if(data) {
                return res.status(200).send({ user:data }); 
            } else {
                return res.status(404).send({ message: 'No se ha actualizado el usuario.' });
            }
        }
    });
}

module.exports = {
	addUser, 
    getUserByUserOrEmailAndPassword, 
    getUserById,
    updateUser
}