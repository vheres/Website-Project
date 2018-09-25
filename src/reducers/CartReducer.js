const INITIAL_STATE = { cart: ""}

export default (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        // case "USER_LOGIN_SUCCESS" :
        //     return action.payload.cart;
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        case "USER_ADD_TO_CART" :
            return action.payload;
        // case "USER_LOGIN_FAIL" :
        //     return { ...state, error: "Authentication Error"};
        case "USER_EMPTY_CART" :
            return INITIAL_STATE;
        default:
            return state;
    }
}