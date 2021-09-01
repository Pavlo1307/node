const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { notFound } = require('./errors/messageError');

const { PORT, dataBasePost } = require('./config/variables');

const app = express();

mongoose.connect(dataBasePost, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, carRouter, loginRouter } = require('./routes');

app.get('/', ((req, res) => {
    res.status(404).end('not found');
}));

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('dsdsdsd');
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || notFound
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}
