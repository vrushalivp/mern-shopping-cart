require('dotenv').config({ path: '../.env' });
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../config/mongoose').User;

var JWT_SECRET = process.env.SECRET_KEY


/* UPDATE user by userId  */
router.put('/:userId', function (req, res, next) {
    var user_id = req.params.userId;


    User.findOne({
        userId: user_id
    }, function (error, user) {
        if (error)
            return res.send(error);

        for (prop in req.body) {
            user[prop] = req.body[prop];
        }
        User.save(function (err, result) {
            result.find(function (err, users) {
                if (err)
                    return res.send(err);
                res.json(users);
            });
        });
    });
});


/* User Login */
router.post('/login', async function (req, res, next) {
    console.log(" users/login : " + req.body)


    var userData = new User(req.body);
    const { email, password } = req.body;

    /*
     * Check if the username and password is correct
     */

    var userExist = await User.findOne({ "email": email, "password": password })

    console.log(" users : " + userExist)

    if (userExist) {
        // console.log(JWT_SECRET)
        res.status(200).json({
            username: userData.email,
            token: jwt.sign({
            }, 'JWT_SECRET', { expiresIn: 60 * 60 })
        });
    } else {
        /*
         * If the username or password was wrong, return 401 ( Unauthorized )
         * status code and JSON error message
         */
        res.status(401).json(

             'Wrong username or password!'

        );
    }

});


/* ADD User */
router.post('/', function (req, res, next) {
    var userData = new User(req.body);

    userData.save(function (err) {
        if (err)
            return res.send(err);

        User.find(function (err, users) {
            if (err)
                return res.send(err);
            res.json(users);
        });
    });

});

module.exports = router;