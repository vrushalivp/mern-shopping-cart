import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./index";
import jwt_decode from "jwt-decode";
import setJWTToken from "../../securityUtils/setJWTToken";

export const createNewUser = (newUser) => async dispatch => {
    try {
        console.log("calling register api");
        await axios.post("/api/users", newUser);
        // dispatch({
        //     type: GET_ERRORS,
        //     payload: {}
        // });
    } catch (err) {
        console.log(" got the errors in registration response .....");
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.message
        });
    }
};

export const login = loginRequest => async dispatch => {
    try {
        console.log('in action'+loginRequest.email);
        // post => login request
        const res = await axios.post("/api/users/login", loginRequest)

        // extract the token from res.data
        const { token } = res.data;
        // store the token into local storage
        localStorage.setItem("jwtToken" , token);
        localStorage.setItem("email",loginRequest.email)
        // set our token in header
        setJWTToken(token);
        // decode the token on React
        const decoded = jwt_decode(token);
        // dispatch to our security reducer

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });


    } catch (err) {
        console.log(" got the errors in login response ....." + err.message);
        dispatch({
            type: GET_ERRORS,
            payload: err.message
        });
    }
};



export const logout = () => dispatch => {
    console.log('logout called')
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");

    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};


