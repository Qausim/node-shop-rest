const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUpUser = (request, response, next) => {
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
};

exports.loginUser = (request, response, next) => {
    const authError = new Error();
    authError.status = 401;
    authError.message = 'Auth failed';
    
    User.find({ email: request.body.email })
        .then(users => {
            if (!users.length) {
                throw authError;
            }
            bcrypt.compare(request.body.password, users[0].password, (err, result) => {
                if (result) {// true if successfule else false
                    const token = jwt.sign({
                        email: users[0].email,
                        userId: users[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    })
                    return response.status(200).json({
                        message: 'Authentication successful',
                        token
                    });
                }
                return response.status(authError.status).json({
                    error: authError
                });
            });
        })
        .catch(error => response.status(error.status).json({
            error
        }));
};

exports.deleteUser = (request, response, next) => {
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
};

exports.getUsers = (request, response, next) => {
    User.find()
        .then(users => response.status(200).json({
            users
        }))
        .catch(error => response.status(500).json({
            error
        }));
};