const express = require('express');
const checkAuth = require('../middleware/check-auth');
const OrderController = require('../controllers/orders');

const router = express.Router();

router.get('/', checkAuth, OrderController.getOrders);

router.post('/', checkAuth, OrderController.postOrder);

router.get('/:id', checkAuth, OrderController.getOrder);

router.delete('/:id', checkAuth, OrderController.deleteOrder);


module.exports = router;