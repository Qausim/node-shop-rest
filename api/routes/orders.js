const express = require('express');

const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (request, response, next) => {
    const order = {
        productId: request.body.product,
        quantity: request.body.quantity
    }
    response.status(201).send({
        message: 'Order was created',
        createdOrder: order
    });
});

router.get('/:id', (request, response, next) => {
    const id = request.params.id;
    response.status(200).json({
        message: 'Order details',
        id
    });
});

router.delete('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Order deleted',
        id: request.params.id
    });
});


module.exports = router;