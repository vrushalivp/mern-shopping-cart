import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from '../Route/WithRouter'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import store from '../redux/store';


class CheckOutModal extends Component {
    constructor(props) {
        super(props)

        console.log('props checkout : ' + JSON.stringify(props))
        console.log('states checkout : ' + JSON.stringify(this.state))

        const sumAll = props.cart.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);

        alert(sumAll)

        const email = localStorage.getItem('email')

        this.state = {
            isLoggedIn: false,
            loggedInStatus: false,
            orderDetails: {
                orderId: Number,
                email: email,
                productsArr: [{
                    productId: Number,
                    Quantity: Number,
                    price:Number
                }],
                shipping: {
                    address: String,
                    paymentMethod: String,
                    nameOnCard: String,
                    cardNumber: Number,
                    expDate: String,
                    cvv: Number

                },
                totalAmount: sumAll,
                date: new Date().toLocaleString()
            }
        }

    }

    componentDidMount() {
        var cartProducts = this.props.cart


        var data = []
        data = cartProducts
        this.setState(prevState => {
            const productsObj = data.map((value, index) => {

                console.log('product ids : ' + value.price)

                this.state.orderDetails.productsArr.push({
                    productId: value._id,
                    Quantity: value.qty,
                    price: value.price
                })
            })
            return productsObj;

        })
    }



    placeOrder = async () => {


        const response = await axios.post(`/api/order`, this.state.orderDetails);

        console.log(' axios response:   ' + JSON.stringify(response))

        if (response.data.errors) {
            toast.error('Something Went Wrong', { position: "top-right" })
        } else {
            toast.success('Your Order Placed Successfully')
        }

        //  store.subscribe(async() => {
        //     var error =await store.getState().errorReducer
        //     console.log('\n\n\n\nstore   : \n'+JSON.stringify(store.getState()));
        //     console.log('\n\n\n\nstore  errroororor : \n'+JSON.stringify(store.getState()));
        //     toast.error('Something Went Wrong', { position: "top-right" })

        // });



    }


    handleInput = (event) => {
        var orderData = this.state.orderDetails.shipping;
        orderData[event.target.name] = event.target.value;

        this.setState({

            shipping: orderData

        })
    }


    cartItems = () => {

        const { cart } = this.props

        return (
            <>
                {cart.map((product) => {
                    return (
                        <>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0 me-3">{product.title}</h6>

                                    <p style={{ fontSize: 'smaller' }}>Qty: {product.qty}</p>
                                    <hr />

                                    <small class="text-muted">{product.description}</small>
                                </div>
                                <span class="text-muted">${product.qty * product.price}</span>
                            </li>

                        </>
                    )
                }
                )}
            </>
        )

    }





    render() {
        const { cart } = this.props

        const sumAll = cart.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);

        return (

            <div class="container mt-5 ">

                <div class="py-5 text-center">
                    <h2>Checkout form</h2>
                </div>

                <div class="row shadow p-3 mb-5 bg-white rounded">

                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Your cart</span>
                            <span class="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul class="list-group mb-3">
                            {<this.cartItems />}
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${sumAll}</strong>
                            </li>
                        </ul>

                        {/* cart items */}
                    </div>


                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Billing address</h4>
                        <form class="needs-validation">

                            <div class="mb-3">
                                <label for="address">Shipping Address</label>
                                <input type="text" class="form-control" id="address" name='address' onChange={this.handleInput} placeholder="1234 Main St" required />
                                <div class="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>




                            <div class="mb-4">

                                <div class="mb-4 ">

                                    <h4 class="mb-3">Payment</h4>

                                    <div class="d-block my-3 d-flex me-5" onChange={this.handleInput}>
                                        <div class="custom-control custom-radio me-4">
                                            <input id="credit" name="paymentMethod" value="credit" type="radio" class="custom-control-input me-2" checked required />
                                            <label class="custom-control-label" for="credit">Credit card</label>
                                        </div>
                                        <div class="custom-control custom-radio me-4">
                                            <input id="debit" name="paymentMethod" value="debit" type="radio" class="custom-control-input me-2" required />
                                            <label class="custom-control-label" for="debit">Debit card</label>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="cc-name">Name on card</label>
                                            <input type="text" class="form-control" id="nameOnCard" name='nameOnCard' placeholder="" onChange={this.handleInput} required />
                                            <small class="text-muted">Full name as displayed on card</small>
                                            <div class="invalid-feedback">
                                                Name on card is required
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="cc-number">Credit card number</label>
                                            <input type="text" class="form-control" id="cardNumber" name='cardNumber' placeholder="" onChange={this.handleInput} required />
                                            <div class="invalid-feedback">
                                                Credit card number is required
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-3 mb-3">
                                            <label for="cc-expiration">Expiration</label>
                                            <input type="text" class="form-control" id="cc-expiration" name='expDate' placeholder="" onChange={this.handleInput} required />
                                            <div class="invalid-feedback">
                                                Expiration date required
                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label for="cc-cvv">CVV</label>
                                            <input type="text" class="form-control" id="cc-cvv" name='cvv' placeholder="" onChange={this.handleInput} required />
                                            <div class="invalid-feedback">
                                                Security code required
                                            </div>
                                        </div>
                                    </div>


                                    <button class="btn btn-primary btn-lg btn-block mb-5" type='button' onClick={this.placeOrder}>Continue to checkout</button>

                                </div>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />

                </div>
            </div>

        )
    }
}



const mapStateToProps = (state) => {

    return {
        cart: state.handleCart,
        security: state.security,
    }
}





export default withRouter(connect(
    mapStateToProps
)(CheckOutModal));
