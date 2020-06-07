'use strict'

const express = require('express');
const productCtrl = require('./../controllers/product');
const userCtrl = require('../controllers/user');
const auth = require ('./../middlewares/auth');
const api = express.Router();

// recupera todos los productos
api.get('/product', productCtrl.getProducts);

// '/api/product/:productId' indica el producto que se quiere recuperar.
api.get('/product/:productId', productCtrl.getProduct);

// '/api/product' es el endpoint
api.post('/product', auth, productCtrl.saveProduct);

// '/api/product/:productId' indica el producto en cuestión que se quiere modificar.
api.put('/product/:productId', auth, productCtrl.updateProduct);

// '/api/product/:productId' indica el producto en cuestión que se quiere eliminar
api.delete('/product/:productId', auth, productCtrl.deleteProduct);

// Para registrarse
api.post('/signup', userCtrl.signUp);

// Para loguearse
api.post('/signin', userCtrl.signIn);

// cuando llamemos a esta ruta, primero llamará al middleware (isAuth)
// y luego la cargará o no, dependiendo de si el usuario está autenticado o no
api.get('/private', auth, (req, res) => {
    res.status(200).send ({message: 'Tienes acceso'});
});


module.exports = api;