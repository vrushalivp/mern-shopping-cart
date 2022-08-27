const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var User = require('../../config/mongoose').User;

/* GET home page. */
router.get('/user', function (req, res, next) {
    console.log('login route admin');
    User.find(function (err, users) {
        if (err)
            res.render('error');
        res.render('./admin/user/allUser', { users: users });
    })

});
router.get('/update-user', function (req, res, next) {
    var name = req.query.name;
    var email = req.query.email;
    var password = req.query.password;
    var id = req.query.id;


    console.log('update route admin' + name);

    res.render('./admin/user/editUser', { name: name, email: email, password: password, id: id });

});

router.post('/update/:id', function (req, res, next) {
    var user_id = req.body;

    console.log('usersid : ' + JSON.stringify(user_id));

    User.findOne({
        _id: req.params.id
    }, function (error, user) {
        if (error) {
            console.log('update user error 1 : ' + JSON.stringify(err));
            res.render('error');
        } else {
            console.log('\n\n user : ' + user);

            for (prop in req.body) {
                console.log(user[prop] + " = " + req.body[prop]);
                console.log(prop);

                user[prop] = req.body[prop];
            }
            user.save(function (err, result) {
                User.find(function (err, users) {
                    if (err) {
                        console.log('update user error 2 : ' + JSON.stringify(err));

                        res.render('error');
                    } else {
                        res.render('./admin/user/allUser', { users: users });
                    }
                });
            });
        }
    });
});


/* DELETE account by accountId  */
router.get('/user-delete', function (req, res, next) {
    var id = req.query.id;

    console.log('in delete user : ' + `ObjectId(${id})`);

    User.deleteOne({
        _id: id
    }, function (err, user) {
        if (err) {
            console.log('delete error 1: ' + JSON.stringify(err));
            res.render('error');
        } else {
            User.find(function (err, users) {
                if (err) {
                    console.log('delete error 2: ' + JSON.stringify(err));

                    res.render('error');
                } else {
                    res.render('./admin/user/allUser', { users: users });
                }
            });
        }
    })
});


/* GET home page. */
router.get('/signup', function (req, res, next) {
    console.log('login route admin');
    res.render('./admin/auth/signup');
});

module.exports = router;
