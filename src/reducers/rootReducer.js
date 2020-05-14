const initState = {
    isAuth: false,
    pseudo: '',
    token: '',
    lang: 'fr'
}

const rootReducer = (state  = initState, action) => {
    if (action.type === 'SET_USER_AUTH') {
        return {
            ...state,
            isAuth: action.isAuth
        }
    }
    else if (action.type === 'SET_USER_TOKEN') {
        return {
            ...state,
            token: action.token
        }
    }
    else if (action.type === 'SET_USER_PSEUDO') {
        return {
            ...state,
            pseudo: action.pseudo
        }
    }
    else if (action.type === 'SET_USER_LANG') {
        return {
            ...state,
            lang: action.lang
        }
    }
    return state
}

export default rootReducer