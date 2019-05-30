const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();


router.post('/signup', (request, response, next) => {
    User.find({email: request.body.email})
        .then(existingUser => {
            if (existingUser.length) {
                const existError = new Error();
                existError.status = 409;
                existError.message = 'Mail exists';
                throw existError;
            } else {
                bcrypt.hash(request.body.password, 10, (error, hash) => {
                    if (error) {
                        error.status = 500;
                        throw error;
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: request.body.email,
                            password: hash
                        });
                        return user.save()
                            .then(user => {
                                console.log(user);
                                response.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                response.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch(error => response.status(error.status || 500).json({
            error
        }));
});

router.post('/signin', (request, response, next) => {

});


router.get('/', (request, response, next) => {
    User.find()
        .then(users => response.status(200).json({
            users
        }))
        .catch(error => response.status(404).json({
            error
        }))
});

router.delete('/:id', (request, response, next) => {
    const id = request.params.id;
    User.findOneAndRemove({_id: id})
        .then(user => {
            if (user) {
                response.status(200).json({
                    message: 'Deleted',
                    user
                });
            } else {
                const error = new Error();
                error.message = 'Not found';
                throw error;
            }
        })
        .catch(error => response.status(404).json({ error }));
});



module.exports = router;