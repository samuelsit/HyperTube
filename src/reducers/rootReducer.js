const initState = {
    isAuth: false,
    user: ''
}

const rootReducer = (state  = initState, action) => {
    if (action.type === 'SET_USER_AUTH') {
        return {
            ...state,
            isAuth: action.isAuth
        }
    }
    else if (action.type === 'SET_USER') {
        return {
            ...state,
            user: action.user
        }
    }
    return state
}

export default rootReducer