'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// definimos el schema
const ProductSchema = Schema ({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['computers', 'phones', 'accesories']},
    description: String,
});

// creamos el modelo llamandolo 'Product'
// y lo exportamos, de esta forma
// importándolo desde otros files, podremos usarlo
module.exports = mongoose.model('Product', ProductSchema);