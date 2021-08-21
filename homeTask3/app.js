const express = require('express');
// const path = require('path')

const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, loginRouter, registerRouter } = require('./routes');

app.get('/', ((req, res) => {
    res.status(404).end('not found');
}));

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
