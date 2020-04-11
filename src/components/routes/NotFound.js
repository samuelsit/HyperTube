import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'

class NotFound extends Component {
    render () {
        return (
            <Fragment>
                <Header/>
                <div className="grad-block">
                    <div className="container container-log">
                        <div className="row">
                            <div className="col login-sec">
                                <h2 className="text-center">Erreur 404</h2>
                                <h3 className="text-center">La page que vous cherchez n'existe pas.</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NotFound