import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SignImg from './SignImg'
import { NavLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from '../Route/WithRouter'
import { createNewUser } from '../redux/action/securityAction';
import { connect } from 'react-redux';

class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: "",
                email: "",
                password: ""
            }
        }
    }


    componentDidMount() {

    }


    getData = (event) => {
        var userArray = this.state.user
        userArray[event.target.name] = event.target.value

        this.setState({ user: userArray })
    }


    submitData = (event) => {
        event.preventDefault()
        const { name, email, password } = (this.state.user)
        if (name === "") {
            toast.error(' name field is required!', {
                position: "top-center",
            });
        } else if (email === "") {
            toast.error('email field is required', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('please enter valid email addres', {
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
            this.props.createNewUser(this.state.user);
            alert("Registration Succesfully!!!")
            this.props.navigate('/login')
        }
    }


    render() {
        return (
            <>
                <div className="container mt-5">
                    <section className='d-flex justify-content-center' style={{ marginLeft: '9%', marginTop: '6%' }}>
                        <div className="left_data mt-5 p-4" style={{ width: "100%" }}>
                            <h3 className='text-center col-lg-9'>SIGN UP</h3>
                            <Form >

                                <Form.Group className="mb-3 col-lg-9" controlId="formBasicName">
                                    <Form.Control type="text" name='name' placeholder="Enter Your Name" onChange={this.getData} />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-9" controlId="formBasicEmail">
                                    <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.getData} />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-9" controlId="formBasicPassword">
                                    <Form.Control type="password" name='password' placeholder="Password" onChange={this.getData} />
                                </Form.Group>

                                <Button variant="primary" onClick={this.submitData} className='col-lg-9' style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                    Submit
                                </Button>

                            </Form>

                            <p className='mt-3'>Already Have an Account <span><NavLink className="fw-bold text-decoration-none" to="/login">Login</NavLink></span> here </p>
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
    errors: state.errors,
    security: state.security
});

export default withRouter(connect(
    mapStateToProps,
    { createNewUser }
)(SignUp))