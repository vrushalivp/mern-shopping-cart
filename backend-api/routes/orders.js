require('dotenv').config({ path: '../.env' });
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Orders = require('../config/mongoose').Orders;

var JWT_SECRET = process.env.SECRET_KEY




/* ADD order */
router.post('/', function (req, res, next) {
  var orderData = new Orders(req.body);
  console.log('orderData : ' + JSON.stringify(orderData));
  orderData.save(function (err) {
    if (err) {
      console.log('errrrr 2 : ' + JSON.stringify(err));

      return res.send(err);
    }

    Orders.find(function (err, orders) {
      if (err) {
        console.log('errrrr : ' + JSON.stringify(err));

        return res.send(err);
      }
      res.json(orders);
    });
  });

});


/* UPDATE order by orderId  */
router.put('/:orderId', function (req, res, next) {
  var order_id = req.params.orderId;


  Orders.findOne({
    orderId: order_id
  }, function (error, order) {
    if (error)
      return res.send(error);

    for (prop in req.body) {
      order[prop] = req.body[prop];
    }
    Orders.save(function (err, result) {
      result.find(function (err, orders) {
        if (err)
          return res.send(err);
        res.json(orders);
      });
    });
  });
});



module.exports = router;