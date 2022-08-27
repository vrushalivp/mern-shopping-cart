require('dotenv').config({ path: '../.env' });
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Product = require('../config/mongoose').Products;

var JWT_SECRET = process.env.SECRET_KEY


/* GET all products  */
router.get('/', function (req, res, next) {

    Product.find(function (err, products) {
        if (err)
            return res.send(err);
        res.json(products);
    })

});


/* GET product by productId  */
router.get('/:productId', function (req, res, next) {
    var product_Id = req.params.productId;

    Product.findOne({
        id: product_Id
    }, function (err, product) {
        if (err)
            return res.send(err);
        res.json(product);
    })
});


/* UPDATE Product by ProductId  */
router.put('/:productId', function (req, res, next) {
    var product_id = req.params.productId;


    Product.findOne({
        id: product_id
    }, function (error, product) {
        if (error)
            return res.send(error);

        for (prop in req.body) {
            product[prop] = req.body[prop];
        }
        Product.save(function (err, result) {
            result.find(function (err, product) {
                if (err)
                    return res.send(err);
                res.json(product);
            });
        });
    });
});




/* ADD Product */
router.post('/', function (req, res, next) {
    var ProductData = new Product(req.body);

    ProductData.save(function (err) {
        if (err)
            return res.send(err);

        Product.find(function (err, products) {
            if (err)
                return res.send(err);
            res.json(products);
        });
    });

});

module.exports = router;