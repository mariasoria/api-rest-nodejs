'use strict'
const Product = require('./../models/product');

function getProduct (req, res) {
    // recuperamos el product id que viene como parámetro en la url
    let productId = req.params.productId;

    Product.findById(productId, (err, product) =>{
        if (err)
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        if (!product)
            return res.status(404).send({message: `El producto no existe`});
        // Podría ser ...send({ product: product }); pero como se llaman igual, se simplifica
        res.status(200).send({ product });
    });
}

function getProducts (req, res) {
    Product.find ({}, (err, products) => {
        if (err)
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        if (!products)
            return res.status(404).send({message: `No hay productos en la BD`});
        
        res.status(200).send({products});
    });
}

function saveProduct (req, res) {
    console.log('POST /api/product');
    console.log(req.body);
    
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    // guardaremos el producto. 
    // Se nos devolverá o un error o ese producto (que tendrá un id único).
    product.save((err, productStored) => {
        if (err)
            res.status(500).send({message: `Error al guardar en la BD: ${err}`});
        res.status(200).send({product: productStored});
    });
}

function updateProduct (req, res) {
    let productId = req.params.productId;
    let bodyUpdate = req.body;

    // 1ºparam: el id
    // 2ºparam: un objeto con los campos que queremos actualizar
    Product.findByIdAndUpdate(productId, bodyUpdate , (err, productUpdated) => {
        if (err)
            return res.status(500).send({message: `Error al actualizar el producto: ${err}`});
        res.status(200).send({product: productUpdated});
    });
}

function deleteProduct (req, res) {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if (err)
            return res.status(500).send({message: `Error al eliminar el producto: ${err}`});
        
        // esta función recibe un err o nada
        product.remove(err => {
            if (err)
                return res.status(500).send({message: `Error al eliminar el producto: ${err}`});
            res.status(200).send({message: `El producto ha sido eliminado`});
        })
    });
}

module.exports = {
    getProduct, 
    getProducts, 
    saveProduct,
    updateProduct, 
    deleteProduct
}