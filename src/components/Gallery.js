import React, { Component, Fragment } from 'react'
import Header from './Header'

class Gallery extends Component {
    render () {
        return (
            <Fragment>
                <Header/>
                <div className="grad-block">
                    <div className="container-fluid container-log">
                        <div className="row">
                            <div className="col-md-4 login-sec">
                                <h2 className="text-center">Galerie</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Gallery