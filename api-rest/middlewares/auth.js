'use strict'

const services = require ('./../services');

function isAuth (req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token = req.headers.authorization.split(" ")[1];
    // Llamamos al decoder de services que hemos definido
    services.decodeToken (token)
        .then(response => {
            // asigamos el sub que se nos envía, al user
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status);
        })
}

module.exports = isAuth;