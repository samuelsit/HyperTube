const initState = {
    isAuth: false
}

const rootReducer = (state  = initState, action) => {
    if (action.type === 'SET_USER_AUTH') {
        return {
            ...state,
            isAuth: action.isAuth
        }
    }
    return state
}

export default rootReducer