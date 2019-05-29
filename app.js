const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

mongoose.connect(`mongodb+srv://qausim:${process.env.MONGO_ATLAS_PW}@node-rest-shop-a15mm.mongodb.net/test?retryWrites=true`, {
    useMongoClient: true
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((request, response, next) => {
    response.header('Access-Control-Allow', '*'); // giving access to all
    response.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({})
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);


// handles every requests to a URL not specified by
// the API
app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// handles every error thrown on the server
app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;