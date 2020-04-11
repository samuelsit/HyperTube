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

import rootReducer from './reducers/rootReducer'
import { loadState, saveState } from './localStorage'

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
