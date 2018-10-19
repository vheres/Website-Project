const INITIAL_STATE = { firstname: "", email: "", category: "", error: "", id: "", cookieCheck: false}


// INITIAL_STATE => default parameter, kalau state tidak menerima apa2 (belum ada state terakhir)
export default (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case "USER_LOGIN_SUCCESS" :
            return {firstname: action.payload.username, email: action.payload.email, category: action.payload.category, error: action.payload.error, id: action.payload.id, cookieCheck: action.payload.cookieCheck};
        case "USER_LOGIN_FAIL" :
            return { ...state, error: "Authentication Error"};
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        case "COOKIES_CHECKED" :
            return { ...state, cookieCheck: true }
        default:
            return state;
    }
}