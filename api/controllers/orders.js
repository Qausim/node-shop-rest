const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getOrders = (request, response, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .then(orders => response.status(200).json({
            count: orders.length,
            orders: orders.map(order => ({
                _id: order._id,
                product: order.product,
                quantity: order.quantity,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/orders/${order._id}`
                }
            }))
        }))
        .catch(error => response.status(404).json({ error }));
};

exports.getOrder = (request, response, next) => {
    const id = request.params.id;
    Order.findById(id)
        .select('_id product quantity')
        .populate('product')
        .then(order => {
            if (!order) {
                const error = new Error();
                error.status = 404;
                error.message = 'Order not found';
                throw error;
            }
            response.status(200).json({
                order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            })
        })
        .catch(error => response.status(error.status || 500).json({ error }));
};

exports.postOrder = (request, response, next) => {
    Product.findById(request.body.product)
        .then(product => {
            if (!product) {
                const error = new Error();
                error.message = 'Product not found';
                error.status = 404;
                throw error;
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: request.body.quantity,
                product: request.body.product
            });
            return order.save()
        })
        .then(order => response.status(201).json({
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
            request: {
                type: 'GET',
                url: `http://localhost:3000/orders/${order._id}`
            }
        }))
        .catch(error => response.status(error.status || 500).json({ error }));
};

exports.deleteOrder = (request, response, next) => {
    const id = request.params.id;
    Order.findByIdAndDelete(id)
        .select('product quantity _id')
        .then(order => {
            if (!order) {
                const error = new Error();
                error.status = 404;
                error.message = 'Order not found';
                throw error;
            }
            response.status(200).json({
                order
            })
        })
        .catch(error => response.status(error.status || 500).json({ error }));
};