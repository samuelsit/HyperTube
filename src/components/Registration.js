import React, { Component } from 'react'
import Header from './Header'

class Registration extends Component {

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        return (
            <Header/>
        )
    }
}

export default Registration