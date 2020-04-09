import React, { Component } from 'react'
import '../css/Film.css'
import { CSSTransition } from 'react-transition-group'

class Film extends Component {
    render () {
        return (
            <>
            <CSSTransition
                in={true}
                appear={true}
                timeout={600}
                classNames="fade"
            >
                <div className="col-lg-2 col-md-3 col-sm-4 col-4 p-1 text-center film">
                    <img className="img-fluid film" src={this.props.img} alt="" />
                </div>
            </CSSTransition>
            </>
        )
    }
}

export default Film