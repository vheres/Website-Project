import { combineReducers } from 'redux';
// import UsersReducer from './UsersReducer';
import AuthReducer from './AuthReducer';

// Pembuatan Global State
export default combineReducers({
    // users: UsersReducer, // yang mengisi state (ex. "users") harus sebuah function (reducer () => []). kalau users: [] error
    auth: AuthReducer
});