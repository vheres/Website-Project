import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';

// export const onLoginSuccess = (user) => {
export const onLogin = (user) => {
    return(dispatch) => {
            axios.get(API_URL_1 +'/users', {
                params: {
                    email: user.email,
                    password: user.password
                }

            }).then(user => {
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { username: user.data[0].username, email: user.data[0].email, error: "", id: user.data[0].id, password: user.data[0].password, cart: user.data[0].cart, cookieCheck: true}
                })       
            }).catch(err => {
                console.log(err);
                dispatch ({
                    type: "USER_LOGIN_FAIL"
                });
            })
        }
    }

export const keepLogin = (email) => {
    return(dispatch) => {
            axios.get(API_URL_1 +'/users', {
                params: {
                    email: email
                }
            }).then(user => {
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { username: user.data[0].username, email: user.data[0].email, error: "", id: user.data[0].id, password: user.data[0].password, cart: user.data[0].cart}
                })
                dispatch ({
                    type: "COOKIES_CHECKED"
                })       
            }).catch(err => {
                console.log(err);
                dispatch ({
                    type: "USER_LOGIN_FAIL"
                });
            })
        }
    }

export const cookieChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    }
}

export const onLogout = () => {
    return(dispatch) => {
    dispatch ({
        type: "USER_LOGOUT"
    });
    dispatch ({
        type: "COOKIES_CHECKED"
    });
}

}

export const onRegister = (user) => {
    return(dispatch) => {
        axios.post(API_URL_1 + '/users', user)
        .then((res) => {
            console.log(res);
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { username: res.data.username, email: res.data.email, error: "", cart: []}
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const onAddToCart = (item) => {
    return(dispatch) => {
        axios.post(API_URL_1 + '/users/', item)
        .then((res) => {
            console.log(res);
            dispatch({
                type: "USER_ADD_TO_CART",
                payload: { link: res.data.link, name: res.data.name, description: res.data.description, quantity: res.data.quantity, price: res.data.price}
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
//dispatch fungsinya sama dengan return, tapi bisa dipakai lebih dari 1x