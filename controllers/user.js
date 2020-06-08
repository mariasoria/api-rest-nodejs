'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require ('../services');

// función de registro de usuario en la BD y crea un token
function signUp (req, res) {
    const user = new User({
        email: req.body.email, 
        displayName: req.body.displayName,
        password: req.body.password
    })
    // guarda y recibe un callback.
    // si hay un error envía 500
    // sino, envia 200 y crea el token.
    // service.createToken es una función ya hecha que se usa
    user.save((err) => {
        if (err) return res.status(500).send({message: `Error al crear el usuario: ${err}`});
        
        // recibe el objecto user y crea el token con esa info
        return res.status(200).send({ token: service.createToken(user)});
    })
}

// funcion login de usuario 
function signIn (req, res) {
    User.find({ email: req.body.email }, (err, user) => {
        // comprobaremos si ha habido un error
        if (err) return res.status(500).send({ message: err});
        // comprobamos si user es null
        if (!user) return res.status(404).send({ message: 'No existe el usuario'});
        // si todo ha ido bien
        req.user =  user;
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token:  service.createToken(user),
        })
    })
}

module.exports = {
    signIn, 
    signUp
}