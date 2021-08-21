const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path')

const {PORT} = require('./config/variables')
const users = require('./db/users')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require('./router/user.routes')

app.get('/', ((req, res) => {
    console.log(req);
    res.status(404).end('not found');
}))

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {
    const {name, password} = req.body;
    const foundUser = users.find(user => user.name === name);

    if(foundUser) {
        if (password === foundUser.password) {
            return res.redirect('/users');
        } else if (password !== foundUser.password) {
            return res.status(404).end('Password is not correct!');
        }
    }
    res.redirect('/register');
});

app.use('/users', userRouter);

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', (req, res) => {
    const newUser = req.body;

    for (const user of users) {
        if (user.name === newUser.name) {
            return res.status(404).end('Login is same',);
        }
    }
    users.push(newUser);
    res.redirect('/users');
})

app.listen(PORT, () => {
    console.log('App listen', PORT);
})