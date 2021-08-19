const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path')

const {PORT} = require('./config/variables')
const users = require('./db/users')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/', ((req, res) => {
    console.log(req);
    res.status(404).end('not found');

}))

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {

    const {name, password} = req.body;

    for (const user of users) {
        if (name === user.name) {
            return res.status(200).redirect('/users');
        }
    }
    res.redirect('/register');

});

app.get('/user/:user_id',(req, res) => {
    const {user_id} = req.params;
    const  currentUsers = users[user_id];

    if (!currentUsers){
        res.status(404).end('User not found!');
        return;
    }
    res.render('userInfo', {currentUsers})
})

app.get('/users', (req, res) => {
    res.render('users', {users});
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', (req, res) => {
    const newUser = req.body;

    for (const user of users) {
        if( user.name === newUser.name){
            return res.status(200).end('Login is same',);
        }
    }
    users.push(newUser);
    res.redirect('/users');

})

app.listen(PORT, () => {
    console.log('App listen', PORT);
})