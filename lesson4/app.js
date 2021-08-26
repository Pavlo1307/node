// Вам необхідно реалізувати CRUD на дві сутності (user, car)
//
// Мають бути реалізовані такі методи:
// 1) Create user
// 2) Get all users
// 3) Get user by email or name
// 4) Delete current user
//
// Все це має бути розбито по роутах, контроллерах, сервісах з обовязковою перевіркою всього що приходить через мідлвари.
//     Також всі меджік стрінги мають бути винесені в константи.
// додати errorHandler
const express = require('express');

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
