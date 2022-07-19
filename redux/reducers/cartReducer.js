const initialState = { 
    cart: [] ,
    selected_product: []
} 

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case "UPDATE_CART": 
            return {...state, cart: action.payload} 
        case "UPDATE_SELECTED_PRODUCT":
            return {...state, selected_product: action.payload} 
        case "CART_ERROR":
            return {error_mes: action.payload}
        default: 
            return state
    }
} 

export default cartReducer