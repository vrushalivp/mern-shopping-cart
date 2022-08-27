// For add item to cart
export const addCart = (product) => {
    return{
        type: "ADDITEM",
        payload:product
    }
}


// For delete Item from cart
export const delCart = (product) => {
    return{
        type: "DELITEM",
        payload: product
    }
}


// For delete Item from cart
export const increaseQty = (product) => {
    return{
        type: "ADDQTY",
        payload: product
    }
}

// For delete Item from cart
export const addUser = (user) => {
    return{
        type: "ADDUSER",
        payload: user
    }
}

export const GET_ERRORS = "GET_ERRORS";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
