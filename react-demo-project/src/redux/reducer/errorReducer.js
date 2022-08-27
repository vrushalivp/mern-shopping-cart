import { GET_ERRORS } from "../action/index";

const initialState = {};
const errorReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_ERRORS:
      console.log('in error reducer');

      return action.payload;
    default:
      return state;
  }
}
export default errorReducer;