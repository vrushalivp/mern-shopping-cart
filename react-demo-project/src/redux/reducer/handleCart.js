const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":

            // check if product is already exists
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                const product = action.payload;
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    }
                ]
            }


        case "ADDQTY":

            // increase product qty in cart
            return state.map((x) =>
                x.id === product.id ? { ...x, qty: x.qty + 1 } : x
            );



        case "DELITEM":
            // remove items from cart
            const existq = state.find((x) => x.id === product.id);
            if (existq.qty === 1) {
                return state.filter((x) => x.id !== existq.id)
            } else {
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                )
            }


        default:
            return state;
    }
}


export default handleCart;