'use strict'

const express = require('express'); // busca en node_modules a express
const bodyParser = require('body-parser');

const hbs = require('express-handlebars');

// creo el servidor que funcionará a través de rutas definidas en routes/index.js
const app = express();
const api = require ('./routes');


// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//para renderizar la vista que vamos a crear
//le decimos que los fich con extension .hbs deben usar hbs
app.engine('.hbs', hbs({
    //layout por defecto es default
    defaultLayout: 'default',
    // extensión .hbs
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// le decimos que la app use la ruta api con nuestro modelo api
app.use('/api', api);

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/', (req, res) => {
	res.render('product');
});

module.exports = app;