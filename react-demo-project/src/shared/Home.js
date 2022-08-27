import React, { Component } from 'react'
import Products from './Products'
import { withRouter } from '../Route/WithRouter'
import { NavLink } from "react-router-dom";

class Home extends Component {


  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }

  }


  componentDidMount() {

  }


  render() {
    return (
      <div className='hero'>
        <div className="card bg-dark text-white border-0">
          <img src="assets/bg.jpg" className="card-img" alt="background" height="550px" />
          <div className="card-img-overlay d-flex flex-column justify-content-center">
            <div className='container'>
              <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
              <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
              <p className='justify-content-center'>
              <NavLink to="/products" className='card-text fs-1 lead btn btn-outline-primary text-center '>
                Shop Now
              </NavLink>
              </p>

            </div>
          </div>
        </div>
        <Products />
      </div>
    )
  }
}


export default withRouter(Home)
