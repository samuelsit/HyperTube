import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

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

const persistedState = loadState()
const store = createStore(rootReducer, persistedState)

store.subscribe(() => {
    saveState(store.getState())
})

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Connection} />
            <Route exact path='/galerie' component={Gallery} />
            <Route exact path='/utilisateurs' component={Users} />
            <Route exact path='/parametres' component={Settings} />
            <Route exact path='/inscription' component={Authentication} />
            <Route exact path='/oubli' component={Forgot} />
            <Route path='/profil/:pseudo' component={Profile} />
            <Route path='/film/:id' component={Film} />
            <Route component={NotFound} />
        </Switch>
   </BrowserRouter>
)

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
)
