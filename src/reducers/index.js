import { combineReducers } from 'redux';
// import UsersReducer from './UsersReducer';
import AuthReducer from './AuthReducer';
import CartReducer from './CartReducer';
// import SelectReducer from './SelectReducer';

// Pembuatan Global State
export default combineReducers({
    // users: UsersReducer, // yang mengisi state (ex. "users") harus sebuah function (reducer () => []). kalau users: [] error
    auth: AuthReducer,
    cart: CartReducer,
    // slct: SelectReducer
});