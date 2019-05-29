const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');

// Initialize express router
const router = express.Router();

router.get('/', (request, response, next) => {
    Product.find()
        .then(products => response.status(200).json({
            products
        }))
        .catch(error => response.status(500).json({
            error
        }));
});

router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });
    product.save()
    .then(res => {
        console.log(res);
        response.status(201).send({
            message: 'Handling POST requests from to /products',
            createdProduct: res
        });
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({
            error
        });
    });
});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
    Product.findById(id)
        .then(product => {
            if (product)
                response.status(200).json({
                    product
                });
            else
                response.status(404).json({
                    message: 'No valid entry found for product ID'
                });
        })
        .catch(error => {
            response.status(500).json({
                error
            });
        });
});

router.patch('/:productId', (request, response, next) => {
    const id = request.params.productId;
    Product.findByIdAndUpdate(id, {
        $set: {
            name: request.body.name,
            price: request.body.price
        }
    }, {
        new: true
    })
        .then(product => response.status(200).json({ product }))
        .catch(error => response.status(404).json({ error}));
});

router.delete('/:productId', (request, response, next) => {
    const id = request.params.productId;
    Product.findByIdAndRemove(id)
        .then(product => response.status(200).json({ product }))
        .catch(error => response.status(500).json({ error }));
});

module.exports = router;