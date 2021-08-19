const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path')

const {PORT} = require('./config/variables')
const users = require('./db/users')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views',path.join(__dirname, 'static'));

app.get('/', ((req, res) => {
    console.log(req);

    //res.end("fsdfsdf")
    //res.json({name:'viktor'})
    res.status(404).end('not found');

}))

app.get('/login', (req, res) => {
    res.render('login', {isMale:true});
})

app.get('/users', (req, res) => {
   res.render('users', { userName: 'victor', users });
})

app.get('/user/:user_id',(req, res) => {
    const {user_id} = req.params;
    const  currentUsers = users[user_id];

    if (!currentUsers){
        res.status(404).end('User not found!');
        return;
    }
    res.json(currentUsers)
})

app.post('/auth', (req, res) => {
    console.log(req.body)
    res.json('ok' );

})


app.listen(PORT, ()=>{
    console.log('App listen', PORT);
})