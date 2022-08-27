import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'
import { delCart, increaseQty } from "../redux/action";
import { NavLink } from "react-router-dom";
import { withRouter } from '../Route/WithRouter';
import './Cart.css'
import store from '../redux/store';

class Cart extends Component {

  constructor(props) {
    super(props)
    console.log('props : ' + JSON.stringify(props))

    this.state = {
      isLoggedIn: false,
      loggedInStatus: false,
      checkOut: false
    }

    store.subscribe(() => {
      this.setState = ({ loggedInStatus: store.getState().securityReducer.validToken })

      // alert('cart : ' + this.state.loggedInStatus)

    });

  }


  deleteItem = (product) => {
    this.props.dispatch(delCart(product))
  }

  increseProduct = (product) => {
    this.props.dispatch(increaseQty(product))
  }

  sum = (key) => {
    return this.reduce((a, b) => a + (b[key] || 0), 0);
  }

  componentDidMount() {
    var isToken = localStorage.getItem('jwtToken')

    if (isToken) {
      this.setState({ isLoggedIn: true })
    } else {
      this.props.navigate('/login')
    }
  }


  cartProduct = () => {
    let { cart } = this.props;

    return (
      <>

        {cart.map((product) => {
          return (
            <>

              <div className="card mb-4">

                <div className="card-body">

                  <div className="row">

                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                        <img src={product.image} alt={product.title}
                          className="w-100" />
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-6 mt-5">

                      <p><strong>{product.title}</strong></p>
                      <p className="text-uppercase text-black-50">{product.category}</p>

                    </div>



                    <div className="col-lg-4 mt-4 col-md-6 mb-4 mb-lg-0">

                      <div className=" mb-2 " style={{ maxWidth: "300px" }}>

                        <div className="form-outline text-center">
                          <label className="form-label" for="form1">Quantity</label>
                          <input id="form1" min="0" name="quantity" value={product.qty} type="number" className="form-control text-center" />
                        </div>

                        <br />

                        <p className="text-start text-md-center">
                          <strong> ${product.qty * product.price}</strong>
                        </p>

                        <div className='d-flex justify-content-between' right={10}>

                          <button className='btn btn-lg' onClick={() => this.deleteItem(product)}>
                            <Icon name='minus' />
                          </button>

                          <button className='btn btn-lg ' onClick={() => this.increseProduct(product)}>
                            <Icon name='plus' />
                          </button>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    );
  }



  emptyCart = () => {

    return (
      <>
        <div className="container-fluid  mt-100">
          <div className="row">

            <div className="col-md-12">

              <div className="card">
                <div className="card-header">
                  {/* <h5>Cart</h5> */}
                </div>
                <div className="card-body cart">
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" alt='cart-img' />
                    <h3><strong>Your Cart is Empty</strong></h3>
                    <h4>Add something to make me happy :)</h4>
                    <NavLink to='/products' className="btn btn-primary" >continue shopping</NavLink>
                  </div>
                </div>
              </div>


            </div>

          </div>

        </div>
      </>
    )

  }



  fullCart = () => {
    let { cart } = this.props;

    const sumAll = cart.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <h3>
                <div className="card-header py-3 text-center text-primary">
                  <h2 className="mb-3 fw-bolder">Your Shopping Cart</h2>
                </div>
              </h3>
              <div className="col-md-8">


                <this.cartProduct />


                <div className="card mb-4 mb-lg-0 text-center">
                  <div className="card-body">
                    <p><strong>We accept</strong></p>
                    <img className="me-2" width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                      alt="Visa" />
                    <img className="me-2" width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                      alt="American Express" />
                    <img className="me-2" width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                      alt="Mastercard" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products
                        <span>${sumAll}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Gratis</span>
                      </li>
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                          <strong>
                            <p className="mb-0">(including VAT)</p>
                          </strong>
                        </div>
                        <span><strong>${sumAll}</strong></span>
                      </li>
                    </ul>

                    <NavLink to="/checkout" className='btn btn-primary btn-lg btn-block'>
                      Go to checkout
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }


  checkOut = () => {
    alert("check")
    this.props.navigate('/checkout')
  }


  cartPage = () => {
    const { cart, navigate } = this.props;

    return (
      <>
        {cart.length > 0 ? < this.fullCart /> : <this.emptyCart />};
      </>
    )
  }

  renderLoggedInState = () => {
    const { isLoggedIn } = this.state;
    const { cart, navigate } = this.props;
    var isToken = localStorage.getItem('jwtToken')

    // if (isToken) {
    //   this.setState({ isLoggedIn: true })
    // } else {
    //   this.props.navigate('/login')
    // }

    if (isToken) {
      return <this.cartPage />
    } else {
      navigate('/login')
    }
  }

  render() {

    return (
      <>
        {this.renderLoggedInState()}
      </>
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
)(Cart));
