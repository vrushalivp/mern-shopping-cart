import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { withRouter } from '../Route/WithRouter';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { sessioncontext } from '../context/SessionContextProvider';
import store from '../redux/store';
import { logout } from '../redux/action/securityAction'


class Header extends Component {

    static contextType = sessioncontext


    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false
        }
    }

    mapStateToProps = (state) => {

        return {
            cart: state.handleCart
        }
    }


    componentDidMount() {

        var checkToken;

        store.subscribe(() => {
            checkToken = store.getState().securityReducer.validToken

            if (checkToken) {
                this.setState({
                    isLoggedIn: true
                })
            } else {
                this.props.navigate('/login')
            }

        })
    }


    logOut = (event) => {
        event.preventDefault()
        this.props.logout()
        localStorage.removeItem('jwtToken')
        sessionStorage.removeItem('email')
        this.props.navigate('/login')
        this.context.setSeesionObj(false);
    }



    render() {


        const isLoggedIn = localStorage.getItem('jwtToken')

        let LoggedInDiv = <>
            <NavLink to="/sign-up" className='btn btn-outline-light me-4'>
                <Icon name='user' />
                Sign Up
            </NavLink>
            &nbsp; &nbsp;&nbsp;

            <NavLink to="login" className='btn btn-outline-light' >
                <Icon name='sign-in' />
                Login
            </NavLink>
        </>


        let LoggedOutDiv =

            <>
                <NavLink to="/cart" className='btn btn-outline-light me-4' >
                    <i className="shopping cart icon" style={{ fontSize: '18px' }}></i> Cart ({this.props.cart.length})
                </NavLink>
                {/* &nbsp; &nbsp;&nbsp;&nbsp; */}

                <NavLink to="/sign-up" className='btn btn-outline-light' onClick={this.logOut}>
                    <Icon name='sign-out' />
                    LogOut
                </NavLink>
                &nbsp; &nbsp;&nbsp;&nbsp;

            </>



        const renderLoggedInState = () => {
            if (isLoggedIn) {
                return LoggedOutDiv;
            } else {
                return LoggedInDiv;
            }
        }

        return (
            <div>
                <Navbar className='fixed-top' variant='dark' style={{ backgroundColor: '#563d7c' }} expand="lg">
                    <Container fluid>
                        <Navbar.Brand to="#" className='' style={{ fontFamily: 'Helvetica Neue', color: 'orange' }}> {process.env.REACT_APP_NAME}</Navbar.Brand> &nbsp;&nbsp;&nbsp;
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <NavLink className='text-decoration-non btn btn-outline-light' to="/">Home</NavLink> &nbsp;&nbsp;&nbsp;
                                <NavLink className='text-decoration-non btn btn-outline-light' to="/products">Products</NavLink>


                            </Nav>
                            <Form className="d-flex">
                                {renderLoggedInState()}
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}


const mapStateToProps = (state) => {

    return {
        security: state.security,
        errors: state.errors,
        cart: state.handleCart
    }
}



// Header.propTypes = {
//     logout: PropTypes.func.isRequired,
//     security: PropTypes.object.isRequired
// };

export default withRouter(
    connect(
        mapStateToProps,
        { logout }
    )(Header)
)

