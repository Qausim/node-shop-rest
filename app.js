const express = require('express');
const morgan = require('morgan');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

const app = express();
app.use(morgan('dev'));


app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

module.exports = app;