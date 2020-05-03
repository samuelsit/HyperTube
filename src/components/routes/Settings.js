import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import profilePic from '../../img/noPicChoose.png'
import { CSSTransition } from 'react-transition-group'
import '../../css/Settings.css'

class Settings extends Component {

    state = {
        lastname: '',
        firstname: '',
        old: '',
        password: '',
        repeat: '',
        verifyLast: '',
        verifyFirst: '',
        verifyOld: '',
        verifyPassword: '',
        verifyRepeat: ''
    }

    _isMounted = false

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {   
        this._isMounted = true
    }

    handleOnBlurSubmit = () => {
        if (this.state.verifyLast === 'is-valid') {
            console.log('requete modifier: ', this.state.lastname)
        }
        if (this.state.verifyFirst === 'is-valid') {
            console.log('requete modifier: ', this.state.firstname)
        } //à enlever
        
        //  SUBMIT ON BLUR | REQUETE API
        //
        //  let { verifyLast, verifyFirst, lastname, firstname } = this.state
        //  if (verifyLast === 'is-valid') {
        //      axios.post('http://localhost:5000/api', {
        //          lastname: lastname
        //      }, {headers: { "x-access-token": this.props.token }})
        //      .then(res => {
        //           console.log(res)
        //      })
        //  }
        //  if (verifyFirst === 'is-valid') {
        //      axios.post('http://localhost:5000/api', {
        //          firstname: firstname
        //      }, {headers: { "x-access-token": this.props.token }})
        //      .then(res => {
        //           console.log(res)
        //      })
        //  }
    }

    handleIsPass = password => {
        // axios
        // .post('http://localhost:5000/api', {
        //     username: this.props.username,
        //     password: password
        // }, {headers: { "x-access-token": this.props.token }})
        // .then(res => {
        //     console.log(res)
        // })
        return true //à enlever
    }

    handleChange = event => {
        const input = event.target
        if (this._isMounted) {
            if (input.name === 'lastname')
                this.setState({ lastname: input.value, verifyLast: /^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/iu.test(input.value) === false ? 'is-invalid' : 'is-valid' })
            else if (input.name === 'firstname')
                this.setState({ firstname: input.value, verifyFirst: /^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/iu.test(input.value) === false ? 'is-invalid' : 'is-valid' })
            else if (input.name === 'old')
                this.setState({ old: input.value, verifyOld: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false || !this.handleIsPass(input.value) ? 'is-invalid' : 'is-valid' })
            else if (input.name === 'password')
                this.setState({ password: input.value, verifyPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false ? 'is-invalid' : 'is-valid' })
            else if (input.name === 'repeat')
                this.setState({ repeat: input.value, verifyRepeat: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false || input.value !== this.state.password ? 'is-invalid' : 'is-valid' })
        }
    }

    handleChangePass = e => {
        e.preventDefault()
        let { verifyOld, verifyPassword, verifyRepeat, old, password, repeat } = this.state
        if (old === '' && this._isMounted) {
            this.setState({ verifyOld: 'is-invalid' })
        }
        if (password === '' && this._isMounted) {
            this.setState({ verifyPassword: 'is-invalid' })
        }
        if (repeat === '' && this._isMounted) {
            this.setState({ verifyRepeat: 'is-invalid' })
        }
        if (verifyOld === 'is-valid' && verifyPassword === 'is-valid' && verifyRepeat === 'is-valid' && window.confirm("Voulez-vous vraiment changer de mot de passe ?")) {
            // axios
            // .post('http://localhost:5000/api', {
            //     old: old,
            //     password: password,
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
                                <h2 className="text-center">Paramètres</h2>
                            </div>
                        </div>
                        <div className="row">
                            <form className="form-contact mx-auto w-75">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                            <label htmlFor="email" className="text-danger h4 text-nowrap">Email</label>
                                            <input type="text" className={`form-control`} name="email" id="email" placeholder="Email*" disabled/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                            <label htmlFor="username" className="text-danger h4 text-nowrap">Pseudo</label>
                                            <input type="text" className={`form-control`} name="username" id="username" placeholder="Pseudo*" disabled/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                            <label htmlFor="lastname" className="text-danger h4 text-nowrap">Nom</label>
                                            <input type="text" className={`form-control ${this.state.verifyLast}`} id="lastname" name="lastname" placeholder="Nom*" value={this.state.lastname} onBlur={this.handleOnBlurSubmit} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                            <label htmlFor="firstname" className="text-danger h4 text-nowrap">Prénom</label>
                                            <input type="text" className={`form-control ${this.state.verifyFirst}`} id="firstname" name="firstname" placeholder="Prénom*" value={this.state.firstname} onBlur={this.handleOnBlurSubmit} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 text-lg-center text-md-center mb-3 mt-lg-3 mt-md-3 mx-auto">
                                            <div className="text-danger h4">Profil</div>
                                            <label htmlFor="picture"><img className="img-fluid upload" alt="profile" src={profilePic} /></label>
                                            <input type="file" className={`form-control d-none`} id="picture"/>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-12 col-md-4 col-lg-4 mb-3  mt-4 mt-lg-5 mt-md-5">
                                            <label htmlFor="repeat" className="text-danger h5">Mot de passe actuel</label>
                                            <input type="password" className={`form-control ${this.state.verifyOld}`} id="old" name="old" placeholder="Mot de passe actuel*" value={this.state.old} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-4 col-lg-4 mb-3  mt-lg-5 mt-md-5">
                                            <label htmlFor="password" className="text-danger h5">Nouveau mot de passe</label>
                                            <input type="password" className={`form-control ${this.state.verifyPassword}`} id="password" name="password" placeholder="Mot de passe*" value={this.state.password} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-4 col-lg-4 mb-3 mt-lg-5 mt-md-5">
                                            <label htmlFor="repeat" className="text-danger h5">Répéter mot de passe</label>
                                            <input type="password" className={`form-control ${this.state.verifyRepeat}`} id="repeat" name="repeat" placeholder="Répéter mot de passe*" value={this.state.repeat} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 text-center mt-4 mb-3">
                                            <button className="btn btn-danger" onClick={this.handleChangePass}>Changer</button>
                                        </div>
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

export default Settings