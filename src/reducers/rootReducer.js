const initState = {
    isAuth: false,
    pseudo: ''
}

const rootReducer = (state  = initState, action) => {
    if (action.type === 'SET_USER_AUTH') {
        return {
            ...state,
            isAuth: action.isAuth
        }
    }
    else if (action.type === 'SET_USER_PSEUDO') {
        return {
            ...state,
            pseudo: action.pseudo
        }
    }
    return state
}

export default rootReducer