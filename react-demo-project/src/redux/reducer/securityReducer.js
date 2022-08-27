import { SET_CURRENT_USER } from "../action";

const initialState = []


const booleanActionPayload = payload => {
    if (payload) {
        return true;
    }
    return false;

};

const securityReducer = (state = initialState, action) => {
    const user = action.payload;
    console.log('In SECURITY REDUCER ')


    switch (action.type) {
        

        case SET_CURRENT_USER:

            return {
                ...state,
                validToken: booleanActionPayload(user),
                user: user,
                isLogged: true
            };

        default:
            return state;
    }
}

export default securityReducer;