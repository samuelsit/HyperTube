import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import { CSSTransition } from 'react-transition-group'
// import axios from 'axios'

class Authentication extends Component {

    state = {
        email: '',
        pseudo: '',
        lastname: '',
        firstname: '',
        password: '',
        repeat: '',
        verifyEmail: '',
        verifyPseudo: '',
        verifyPassword: '',
        verifyRepeat: '',
        verifyLast: '',
        verifyFirst: ''
    }

    handleChange = event => {
        const input = event.target
        if (input.name === 'email')
            this.setState({ email: input.value, verifyEmail: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(input.value) === false ? 'is-invalid' : 'is-valid' })
        else if (input.name === 'username')
            this.setState({ pseudo: input.value, verifyPseudo: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,15}$/igm.test(input.value) === false ? 'is-invalid' : 'is-valid' })
        else if (input.name === 'lastname')
            this.setState({ lastname: input.value, verifyLast: /^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/iu.test(input.value) === false ? 'is-invalid' : 'is-valid' })
        else if (input.name === 'firstname')
            this.setState({ firstname: input.value, verifyFirst: /^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/iu.test(input.value) === false ? 'is-invalid' : 'is-valid' })
        else if (input.name === 'password')
            this.setState({ password: input.value, verifyPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false ? 'is-invalid' : 'is-valid' })
        else if (input.name === 'repeat')
            this.setState({ repeat: input.value, verifyRepeat: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false || input.value !== this.state.password ? 'is-invalid' : 'is-valid' })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { email, pseudo, lastname, firstname, password, verifyEmail, verifyPseudo, verifyPassword, verifyRepeat, verifyLast, verifyFirst } = this.state

        if (verifyEmail === 'is-valid' && verifyPseudo === 'is-valid' && verifyPassword === 'is-valid' && verifyRepeat === 'is-valid' && verifyLast === 'is-valid' && verifyFirst === 'is-valid') {
            console.log('req inscription: ' + email, pseudo, lastname, firstname, password);
            // axios
            // .post('http://localhost:5000/api', {
            //     email: this.props.email,
            //     username: this.props.pseudo,
            //     lastname: this.props.lastname,
            //     firstname: this.props.firstname,
            //     password: this.props.password
            // }, {headers: { "x-access-token": this.props.token }})
            // .then(res => {
            //     console.log(res)
            // })
        }
    }

    render () {
        return (
            <Fragment>
                <Header/>
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={600}
                    classNames="fade"
                >
                <div className="grad-block">
                    <div className="container container-log pb-lg-5">
                        <div className="row">
                            <div className="login-sec mx-auto">
                                <h2 className="text-center">S'inscrire</h2>
                            </div>
                        </div>
                        <div className="row">
                            <form className="form-contact mx-auto w-75" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="email" className="text-danger h4">Email</label>
                                            <input type="text" id="email" className={`form-control ${this.state.verifyEmail}`} name="email" placeholder="Email*" onChange={this.handleChange} value={this.state.email} required/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="pseudo" className="text-danger h4">Pseudo</label>
                                            <input type="text" id="pseudo" className={`form-control ${this.state.verifyPseudo}`} name="username" placeholder="Pseudo*" onChange={this.handleChange} value={this.state.pseudo} required/>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="lastname" className="text-danger h4">Nom</label>
                                            <input type="text" id="lastname" className={`form-control ${this.state.verifyLast}`} name="lastname" placeholder="Nom*" onChange={this.handleChange} value={this.state.lastname} required/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="firstname" className="text-danger h4">Prénom</label>
                                            <input type="text" id="firstname" className={`form-control ${this.state.verifyFirst}`} name="firstname" placeholder="Prénom*" onChange={this.handleChange} value={this.state.firstname} required/>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="password" className="text-danger h4">Mot de passe</label>
                                            <input type="password" id="password" className={`form-control ${this.state.verifyPassword}`} name="password" placeholder="Mot de passe*" onChange={this.handleChange} value={this.state.password} required/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="repeat" className="text-danger h4">Répéter mot de passe</label>
                                            <input type="password" id="repeat" className={`form-control ${this.state.verifyRepeat}`} name="repeat" placeholder="Répéter mot de passe*" onChange={this.handleChange} value={this.state.repeat} required/>
                                        </div>
                                    </div>
                                    <div className="row mt-5 mx-auto">
                                        <button type="submit" className="btn btn-danger mx-auto">Envoyer</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

export default Authentication