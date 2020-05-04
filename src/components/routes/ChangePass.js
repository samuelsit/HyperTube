import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import axios from 'axios'

class ChangePass extends Component {

    state = {
        password: '',
        repeat: '',
        verifyPassword: '',
        verifyRepeat: '',
        message: ''
    }

    _isMounted = false

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleChange = event => {
        const input = event.target
        if (input.name === 'password' && this._isMounted)
            this.setState({ password: input.value, verifyPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false ? 'is-invalid' : 'is-valid' })
        else if (input.name === 'repeat' && this._isMounted)
            this.setState({ repeat: input.value, verifyRepeat: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false || input.value !== this.state.password ? 'is-invalid' : 'is-valid' })
    }

    handleChangePass = e => {
        e.preventDefault()
        let { verifyPassword, verifyRepeat, password, repeat } = this.state
        const token = this.props.match.params.token

        if (password === '' && this._isMounted) {
            this.setState({ verifyPassword: 'is-invalid' })
        }
        if (repeat === '' && this._isMounted) {
            this.setState({ verifyRepeat: 'is-invalid' })
        }
        if (verifyPassword === 'is-valid' && verifyRepeat === 'is-valid' && window.confirm("Voulez-vous vraiment changer de mot de passe ?")) {
            axios
            .put('http://localhost:5000/api/v1/auth/newPassword/' + token, {
                password: password,
                repeat: repeat
            })
            .then(res => {
                console.log(res)
                if (this._isMounted) {
                    this.setState({message: 'Mot de passe changé avec succes'})
                }
            })
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
                                    <h2 className="text-center shadow-theme">Changement de mot de passe</h2>
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-6 mb-3  mt-lg-5 mt-md-5">
                                            <label htmlFor="password" className="text-danger h5">Nouveau mot de passe</label>
                                            <input type="password" className={`form-control ${this.state.verifyPassword}`} id="password" name="password" placeholder="Mot de passe*" value={this.state.password} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mb-3 mt-lg-5 mt-md-5">
                                            <label htmlFor="repeat" className="text-danger h5">Répéter mot de passe</label>
                                            <input type="password" className={`form-control ${this.state.verifyRepeat}`} id="repeat" name="repeat" placeholder="Répéter mot de passe*" value={this.state.repeat} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 text-center mt-4 mb-3">
                                            <button className="btn btn-danger" onClick={this.handleChangePass}>Changer</button>
                                            <div className="font-weight-bold text-danger text-center mt-3">{this.state.message}</div>
                                        </div>
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

export default ChangePass