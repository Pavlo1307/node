const router = require('express').Router();

router.get('/users/:user_id', (req, res) => {
    const {user_id} = req.params;
    const currentUsers = users[user_id];

    if (!currentUsers) {
        res.status(404).end('User not found!');
        return;
    }
    res.render('userInfo', {currentUsers})
})

router.get('/users', (req, res) => {
    res.render('users', {users});
})

module.exports = router;