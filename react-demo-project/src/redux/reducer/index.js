import handleCart from './handleCart';
import {combineReducers} from "redux";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";


const rootReducers = combineReducers({
    handleCart,
    securityReducer,
    errorReducer
})


export default rootReducers;