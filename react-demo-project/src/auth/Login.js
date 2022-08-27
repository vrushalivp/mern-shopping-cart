import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SignImg from './SignImg'
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom'
import { withRouter } from '../Route/WithRouter'
import { sessioncontext } from '../context/SessionContextProvider';
import { login } from '../redux/action/securityAction'
import { connect } from 'react-redux';
import store from '../redux/store';
import { toast, ToastContainer } from 'react-toastify';


class Login extends Component {

    static contextType = sessioncontext

    constructor(props) {
        super(props)

        this.state = {
            user: {
                email: "",
                password: "",
            },
            isLoggedIn: false,
            isError: ''

        }
    }


    componentDidMount() {




    }




    handleInput = (event) => {
        var userData = this.state.user;
        userData[event.target.name] = event.target.value;

        this.setState({ user: userData })
    }


    submitData = (event) => {
        event.preventDefault()

        const loginRequest = {
            email: this.state.user.email,
            password: this.state.user.password
        };

        const { email, password } = (this.state.user)
        if (email === "") {
            toast.error('email field is required', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('plz enter valid email addres', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('password field is required', {
                position: "top-center",
            });
        } else if (password.length < 6) {
            toast.error('password should contain at least 6 characters', {
                position: "top-center",
            });
        } else {

            this.props.login(loginRequest);
            store.subscribe(() => {
                var error = store.getState().errorReducer
                this.setState({ isError: error })

                var isToken = localStorage.getItem('jwtToken')

                if (isToken) {
    
                    this.context.setSeesionObj(true);
                    this.props.navigate('/')
    
                } else if (this.state.isError.includes('401')) {
    
                    toast.error('Username or Password is Invalid', { position: "top-center" })
    
                } else {
    
                    this.props.navigate('/login')
    
                }
            });
           


        }


    }



    render() {

        return (
            <>
                <div className="container mt-4">

                    <section className='d-flex justify-content-center' style={{ marginLeft: '9%', marginTop: '8%' }}>

                        <div className="left_data mt-5 p-4 justify-content-between" style={{ width: "100%" }}>

                            <h3 className='text-center col-lg-9'>LOGIN</h3>

                            <Form >

                                <Form.Group className="mb-3 col-lg-9" controlId="formBasicEmail">

                                    <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.handleInput} />

                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-9" controlId="formBasicPassword">

                                    <Form.Control type="password" name='password' placeholder="Password" onChange={this.handleInput} />

                                </Form.Group>

                                <Button variant="primary" className='col-lg-9' onClick={this.submitData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                    Submit
                                </Button>

                            </Form>

                            <p className='mt-3'>Don't Have an Account <span><NavLink className="fw-bold text-decoration-none" to="/sign-up">SignUp</NavLink></span> here </p>

                        </div>

                        <SignImg />

                    </section>

                    <ToastContainer />

                </div>
            </>
        )
    }
}



const mapStateToProps = (state) => ({
    security: state.security,
    errors: state.errors
});

Login.contextType = sessioncontext

export default withRouter(
    connect(
        mapStateToProps,
        { login }
    )(Login)
)
