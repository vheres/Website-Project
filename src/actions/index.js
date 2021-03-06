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
                console.log(user.data.firstname);
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: user.data.firstname, email: user.data.email, error: "", category: user.data.category, id: user.data.id, cookieCheck: true }
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
    console.log(email);
    console.log('here');
    return(dispatch) => {
            axios.get(API_URL_1 +'/users', {
                params: {
                    email: email
                }
            }).then(user => {
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: user.data.firstname, email: user.data.email, category: user.data.category, error: "", id: user.data.id, cookieCheck: true }
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
            if (res.data.error === undefined) {
                dispatch({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: res.data.firstname, email: res.data.email, category: user.data.category, id: res.data.id, error: "", cookieCheck: true}
                })
            }
            else {
                alert(`${res.data.error}`)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}