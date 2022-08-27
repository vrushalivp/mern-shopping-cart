const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var Product = require('../../config/mongoose').Products;

/* GET Product page. */
router.get('/product', function (req, res, next) {
    console.log('get product route admin');
    Product.find(function (err, products) {
        if (err)
            res.render('error');
        res.render('./admin/product/allProduct', { products: products });
    })

});

router.get('/new-product', function (req, res, next) {
    console.log('get new product route admin');

    res.render('./admin/product/addNewProduct');

});

router.get('/update-product', function (req, res, next) {

    var queryParams = req.query

    var title = queryParams.title;
    var category = queryParams.category;
    var price = queryParams.price;
    var quantity = queryParams.quantity;
    var id = queryParams.id;



    res.render('./admin/product/editProduct', {
        title: title,
        category: category,
        price: price,
        quantity: quantity,
        id: id
    });

});

router.post('/update-product/:id', function (req, res, next) {
    var id = req.params.id;

    console.log('Product Update : ' + JSON.stringify(req.body));

    Product.findOne({
        _id: id
    }, function (error, product) {
        if (error) {
            console.log('update product error 1 : ' + JSON.stringify(err));
            res.render('error');
        } else {

            for (prop in req.body) {
                if (prop === 'count') {
                    product['rating']['count'] = req.body[prop];
                } else {
                    product[prop] = req.body[prop];
                }
            }
            product.save(function (err, result) {
                Product.find(function (err, products) {
                    if (err) {
                        console.log('update product error 2 : ' + JSON.stringify(err));

                        res.render('error');
                    } else {
                        res.render('./admin/product/allProduct', { products: products });
                    }
                });
            });
        }
    });
});


/* DELETE product by productId  */
router.get('/product-delete', function (req, res, next) {
    var id = req.query.id;

    console.log('in delete product : ' + `ObjectId(${id})`);

    Product.deleteOne({
        _id: id
    }, function (err, product) {
        if (err) {
            console.log('delete product error 1: ' + JSON.stringify(err));
            res.render('error');
        } else {
            Product.find(function (err, products) {
                if (err) {
                    console.log('delete product error 2: ' + JSON.stringify(err));

                    res.render('error');
                } else {
                    res.render('./admin/product/allProduct', { products: products });
                }
            });
        }
    })
});

/* ADD Product */
router.post('/add-product', function (req, res, next) {
    var ProductData = new Product(req.body);

    ProductData.save(function (err) {
        if (err) {
            console.log('add product error 1: ' + JSON.stringify(err));

            return res.render('error');
        }

        Product.find(function (err, products) {
            if (err) {
                console.log('add product error 2: ' + JSON.stringify(err));

                return res.render('error');
            }
            res.render('./admin/product/allProduct', { products: products });
        });
    });

});

module.exports = router;
