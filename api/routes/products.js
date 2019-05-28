const express = require('express');

// Initialize express router
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Handling GET requests to /products"
    });
});

router.post('/', (request, response, next) => {
    response.status(200).json({
        message: "Handling POST requests to /products"
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