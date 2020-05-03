const initState = {
    isAuth: false,
    pseudo: '',
    token: ''
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
    else if (action.type === 'SET_USER_TOKEN') {
        return {
            ...state,
            token: action.token
        }
    }
    return state
}

export default rootReducer