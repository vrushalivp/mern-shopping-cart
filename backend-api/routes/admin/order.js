const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var Orders = require('../../config/mongoose').Orders;
var Products = require('../../config/mongoose').Products;


/* GET home page. */
router.get('/orders/:id', async function (req, res, next) {

    var prodTitle
    var prodPrice
    var prodQuantity
    var orderDate
    var totalAmount
    var category

    var unique = []

    var orderDetails = []

    console.log('orders route admin : ' + req.params.id);
    Orders.aggregate({
        from: 'products',
        localField: 'productsArr.productId',
        foreignField: '_id',
        as: 'productsArr.product'
      }
      )
    var orders = await Orders.find({ email: req.params.id })

    console.log('\n\norders of user : ' + JSON.stringify(orders) + "\n\n " + orders.length);

    var orderFunction = await getOrderDetails(orders);



    console.log('\n\n\nfinal order of user : ' + JSON.stringify(orderFunction));
    console.log('\n\nfind product in order  length : ' + orderFunction.length);

    if (orderFunction) {
        res.render('./admin/user/orders', { orderDetails: orderFunction });
    }

});


// orderDetails.push({
//     prodTitle: prod.title,
//     prodPrice: val['price'],
//     prodQuantity: val['Quantity'],
//     orderDate: value['date'],
//     totalAmount: value['totalAmount'],
//     prodCategory: prod.category
// })


router.get('/update-user', function (req, res, next) {
    var name = req.query.name;
    var email = req.query.email;
    var password = req.query.password;
    var id = req.query.id;


    console.log('update route admin' + name);

    res.render('./admin/user/editUser', { name: name, email: email, password: password, id: id });

});

router.post('/update', function (req, res, next) {
    var user_id = req.body;

    console.log('usersid : ' + JSON.stringify(user_id));

    User.findOne({
        email: req.body.email
    }, function (error, user) {
        if (error)
            res.render('error');

        for (prop in req.body) {
            user[prop] = req.body[prop];
        }
        user.save(function (err, result) {
            User.find(function (err, users) {
                if (err)
                    res.render('error');
                res.render('./admin/user/allUser', { users: users });
            });
        });
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


async function getOrderDetails(orders) {
    var orderDetails = [];
    var productDetails = [];

    return new Promise(async function (resolve, reject) {
        orders.map(async (value, key) => {

            await value['products'].forEach(async ele => {
                if (ele.productId) {
                    const productRes = await Products.find({ _id: ele.productId }).then(response => {
                        console.log('\n\n\n\n\n\n   elePRodd svn vf : ' + JSON.stringify(response));
                        if (response) {

                            console.log('\n\n\nfind product in order  2 : ' + JSON.stringify(response));

                            orderDetails.push({
                                products: [{ id: ele._id, productId: ele.productId, qty: ele.Quantity, exactPrice: ele.price }],
                                orderDate: value['date'],
                                totalAmount: value['totalAmount']
                            })
                        }
                    }).then(async() => {
                        console.log('\n\n\n\n\n\n\n\n\n   checkkkkkkkkkkkkkkkkkkk : ' + JSON.stringify(orderDetails));
                        
                         resolve(orderDetails)
                    })

                    // res.render('./admin/product/allProduct', { products: products });

                }
            })
            console.log('\n\n\nin promise : ' + JSON.stringify(orderDetails));




        })
    }).then(res => {
        console.log('\n\n\nin promise then : ' + JSON.stringify(res));
        return res;
    })
}

module.exports = router;
