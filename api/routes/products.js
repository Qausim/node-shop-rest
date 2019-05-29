const express = require('express');

// Initialize express router
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Handling GET requests to /products"
    });
});

router.post('/', (request, response, next) => {
    const product = {
        name: request.body.name,
        price: request.body.price
    };
    response.status(201).send({
        message: 'Handling POST requests from to /products',
        createdProduct: product
    });
});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
    if (id === 'special') {
        response.status(200).json({
            message: 'You got the special',
            id
        });
    } else {
        response.status(200).json({
            message: 'You passed an ID',
            id
        });
    }
});

router.patch('/:productId', (request, response, next) => {
    response.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (request, response, next) => {
    response.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;