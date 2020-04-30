import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'

class Forgot extends Component {

    state = {
        email: '',
        verify: ''
    }

    handleChange = event => {
        const email = event.target.value
        this.setState({ email: email, verify: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false ? 'is-invalid' : 'is-valid' })
    }

    handleSubmit = event => {
        event.preventDefault()
        const {email, verify} = this.state

        if (verify === 'is-valid') {
            console.log('req email: ' + email);
        }
    }

    render () {
        return (
            <Fragment>
                <Header />
                <div className="grad-block">
                    <div className="container container-log">
                        <div className="row">
                            <div className="col login-sec">
                                <form className="" onSubmit={this.handleSubmit}>
                                    <h2 className="text-center shadow-theme">Votre adresse email</h2>
                                    <input type="email" id="email" placeholder="name@exemple.com" className={`form-control w-75 text-center mx-auto mb-3 ${this.state.verify}`} onChange={this.handleChange}/>
                                    <div className="mx-auto text-center">
                                        <button type="submit" className="btn btn-danger text-light mt-4">Recevoir un email</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Forgot