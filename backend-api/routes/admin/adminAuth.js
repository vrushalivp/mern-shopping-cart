var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('login route admin');
    res.render('./admin/auth/login');
});

/* GET home page. */
router.get('/signup', function (req, res, next) {
    console.log('login route admin');
    res.render('./admin/auth/signup');
});

module.exports = router;
