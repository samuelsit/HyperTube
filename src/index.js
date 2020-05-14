import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './i18n';

import Connection from './components/routes/Connection'
import NotFound from './components/routes/NotFound'
import Gallery from './components/routes/Gallery'
import Film from './components/routes/Film'
import Profile from './components/routes/Profile'

import rootReducer from './reducers/rootReducer'
import { loadState, saveState } from './localStorage'
import Users from './components/routes/Users'
import Settings from './components/routes/Settings'
import Forgot from './components/routes/Forgot'
import Authentication from './components/routes/Authentication'
import ChangePass from './components/routes/ChangePass'
import Confirm from './components/routes/Confirm'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

require('dotenv').config()

const persistedState = loadState()
const store = createStore(rootReducer, persistedState)

store.subscribe(() => {
    saveState(store.getState())
})

const Root = () => (
    <BrowserRouter>
        <Switch>
            <PublicRoute exact path='/' component={Connection} />
            <PrivateRoute exact path='/galerie' component={Gallery} />
            <PrivateRoute exact path='/utilisateurs' component={Users} />
            <PrivateRoute exact path='/parametres' component={Settings} />
            <PublicRoute exact path='/inscription' component={Authentication} />
            <PublicRoute exact path='/oubli' component={Forgot} />
            <PublicRoute path='/changement-de-mot-de-passe/:token' component={ChangePass} />
            <PublicRoute path='/confirmation/:token' component={Confirm} />
            <PrivateRoute path='/profil/:pseudo' component={Profile} />
            <PrivateRoute path='/film/:id' component={Film} />
            <PublicRoute component={NotFound} />
        </Switch>
   </BrowserRouter>
)

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
)
