var router = require('express').Router();
const passport = require('../auth/facebook');
const auth = require('../controllers/auth');

router.get('/register', auth.getRegister);
router.post('/register', auth.register);

router.get('/login', auth.login);
router.get('/login/callback',auth.loginCallback,function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

router.get('/logout', auth.logout);

module.exports = router;