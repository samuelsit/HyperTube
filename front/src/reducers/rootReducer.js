const initState = {
    isAuth: false,
    pseudo: '',
    token: '',
    lang: 'en',
    src: 'yts',
    currentTorrent: 0
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
    else if (action.type === 'SET_USER_SRC') {
        return {
            ...state,
            src: action.src
        }
    }
    else if (action.type === 'SET_CURRENT_TORRENT') {
        return {
            ...state,
            currentTorrent: action.currentTorrent
        }
    }
    return state
}

export default rootReducer