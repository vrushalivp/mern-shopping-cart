var mongoose = require("mongoose");
var dbName = 'shoppingCart';
var connectionString = 'mongodb://127.0.0.1:27017/' + dbName;

//create a connection with mmongodb

mongoose.connect(connectionString);


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
    password: String
});

var productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    }
});


var orderSchema = new mongoose.Schema({
    orderId: Number,
    email: String,
    productsArr: [{
        productId:ObjectId,
        Quantity:Number,
        price:Number
    }],
    shipping: [{
        address:String,
        cardDetails:{
            paymentMethod:String,
            named:String,
            cardNumber:Number,
            expDate:String,
            cvv:Number
        }
    }],
    totalAmount:Number,
    date:String

});

const User = mongoose.model('user_masters', userSchema);
const Products = mongoose.model('products', productSchema);
const Orders = mongoose.model('orders', orderSchema);


module.exports = {
    User,
    Products,
    Orders
};