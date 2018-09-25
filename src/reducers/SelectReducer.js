const INITIAL_STATE = { select: ""}

export default (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case "USER_SELECT_ITEM" :
            return {select : action.payload.select};
        default:
            return state;
    }
}