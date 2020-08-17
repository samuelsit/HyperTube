import React, { Component } from 'react'
import Header from '../utils/Header'
import '../../css/Settings.css'
import axios from 'axios'
import { connect } from 'react-redux'
import translate from '../../i18n/translate'
import { I18nProvider, LOCALES } from '../../i18n'
import { motion } from 'framer-motion'
import { pageVariant, pageTransition } from '../../css/motion'

class Settings extends Component {

    state = {
        email: '',
        lastname: '',
        firstname: '',
        password: '',
        repeat: '',
        verifyEmail: '',
        verifyLast: '',
        verifyFirst: '',
        verifyPassword: '',
        verifyRepeat: '',
        pictures: ''
    }

    _isMounted = false

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {   
        this._isMounted = true
        axios.get('http://localhost:5000/api/v1/profile/' + this.props.pseudo, { headers: { token: this.props.token }})
        .then(res => {
            let {email, lastname, firstname, picture} = res.data.response
            this.setState({
              picture: picture !== '' ? /^https.+/.test(picture) === true ? picture : `/pictures/${picture}` : require('../../img/noPic.png'),
              email: email,
              lastname: lastname,
              firstname: firstname
            })
        })
        .catch(error => {
          console.error(error)
          if (error.response.status) {
            this.handleDisconnect()
          }
        })
    }

    handleOnBlurSubmit = () => {
        let { verifyLast, verifyFirst, verifyEmail, email, lastname, firstname } = this.state
        let { token } = this.props
        if (verifyEmail === 'is-valid') {
            axios.put('http://localhost:5000/api/v1/profile/email', {
                email: email
            }, { headers: { token: token }})
        }
        if (verifyLast === 'is-valid') {
            axios.put('http://localhost:5000/api/v1/profile/lastname', {
                lastname: lastname
            }, { headers: { token: token }})
        }
        if (verifyFirst === 'is-valid') {
            axios.put('http://localhost:5000/api/v1/profile/firstname', {
                firstname: firstname
            }, { headers: { token: token }})
        }
    }

    handleChange = event => {
        const input = event.target
        if (this._isMounted) {
            if (input.name === 'email')
                this.setState({ email: input.value, verifyEmail: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(input.value) === false ? 'is-invalid' : 'is-valid' })
            else if (input.name === 'lastname')
                this.setState({ lastname: input.value, verifyLast: /^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/iu.test(input.value) === false ? 'is-invalid' : 'is-valid' })
            else if (input.name === 'firstname')
                this.setState({ firstname: input.value, verifyFirst: /^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/iu.test(input.value) === false ? 'is-invalid' : 'is-valid' })
            else if (input.name === 'password')
                this.setState({ password: input.value, verifyPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false ? 'is-invalid' : 'is-valid' })
            else if (input.name === 'repeat')
                this.setState({ repeat: input.value, verifyRepeat: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.value) === false || input.value !== this.state.password ? 'is-invalid' : 'is-valid' })
        }
    }

    handleChangePass = e => {
        e.preventDefault()
        let { verifyPassword, verifyRepeat, password, repeat } = this.state
        if (password === '' && this._isMounted) {
            this.setState({ verifyPassword: 'is-invalid' })
        }
        if (repeat === '' && this._isMounted) {
            this.setState({ verifyRepeat: 'is-invalid' })
        }
        if (verifyPassword === 'is-valid' && verifyRepeat === 'is-valid' && window.confirm("Voulez-vous vraiment changer de mot de passe ?")) {
            axios
            .put('http://localhost:5000/api/v1/profile/password', {
                password: password,
                repeat: repeat
            }, {headers: { "token": this.props.token }})
        }
    }

    handlePicture = event => {
        let {token} = this.props
        if (event.target.files) {
          const fd = new FormData()
          fd.append('picture', event.target.files[0], event.target.files[0].name)
          axios
          .put('http://localhost:5000/api/v1/profile/picture', fd, { headers: { token: token }})
          .then(res => {
                if (res.data === '') {
                    alert('erreur lors du chargement de l\'image')
                }
                else {                    
                    this.setState({picture: `/pictures/${res.data.pictureName}`})
                }
            })
          .catch(error => {
            console.error(error)
            if (error.response.status === 401) {
              this.handleDisconnect()
            }
          })
        }
    }

    handleDisconnect = () => {
      this.props.setUserIsAuth(false)
      this.props.setUserToken('')
      this.props.setUserPseudo('')
      this.props.setCurrentTorrent(0)
    }

    render () {
        return (
            <I18nProvider locale={this.props.lang === 'fr' ? LOCALES.FRENCH : LOCALES.ENGLISH }>
                <Header/>
                <motion.div 
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariant}
                transition={pageTransition}
                className="grad-block">
                    <div className="container container-log pb-lg-5">
                        <div className="row">
                            <div className="login-sec mx-auto">
                                <h2 className="text-center">{translate('settings')}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <form className="form-contact mx-auto w-75">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                            <label htmlFor="username" className="text-danger h4 text-nowrap">{translate('pseudo')}</label>
                                            <input type="text" className={`form-control`} name="username" id="username" placeholder="Pseudo*" value={this.props.pseudo} disabled/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                            <label htmlFor="email" className="text-danger h4 text-nowrap">Email</label>
                                            <input type="text" className={`form-control ${this.state.verifyEmail}`} name="email" id="email" value={this.state.email} onBlur={this.handleOnBlurSubmit} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                            <label htmlFor="lastname" className="text-danger h4 text-nowrap">{translate('lastname')}</label>
                                            <input type="text" className={`form-control ${this.state.verifyLast}`} id="lastname" name="lastname" value={this.state.lastname} onBlur={this.handleOnBlurSubmit} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mb-3">
                                            <label htmlFor="firstname" className="text-danger h4 text-nowrap">{translate('firstname')}</label>
                                            <input type="text" className={`form-control ${this.state.verifyFirst}`} id="firstname" name="firstname" value={this.state.firstname} onBlur={this.handleOnBlurSubmit} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 text-lg-center text-md-center mb-3 mt-lg-3 mt-md-3 mx-auto">
                                            <div className="text-danger h4">{translate('profile-picture')}</div>
                                            <label htmlFor="picture"><img className="img-fluid upload" alt="profile" src={this.state.picture} /></label>
                                            <input type="file" onChange={this.handlePicture} className={`form-control d-none`} id="picture"/>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-6 mb-3  mt-lg-5 mt-md-5">
                                            <label htmlFor="password" className="text-danger h5">{translate('new-password')}</label>
                                            <input type="password" className={`form-control ${this.state.verifyPassword}`} id="password" name="password" placeholder="Mot de passe*" value={this.state.password} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mb-3 mt-lg-5 mt-md-5">
                                            <label htmlFor="repeat" className="text-danger h5">{translate('repeat-password')}</label>
                                            <input type="password" className={`form-control ${this.state.verifyRepeat}`} id="repeat" name="repeat" placeholder="Répéter mot de passe*" value={this.state.repeat} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-12 text-center mt-4 mb-3">
                                            <button className="btn btn-danger" onClick={this.handleChangePass}>{translate('change')}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </I18nProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
      setCurrentTorrent: (currentTorrent) => {
          dispatch({ type: 'SET_CURRENT_TORRENT', currentTorrent: currentTorrent })
      },
      setUserIsAuth: (isAuth) => {
        dispatch({ type: 'SET_USER_AUTH', isAuth: isAuth })
      },
      setUserToken: (token) => {
          dispatch({ type: 'SET_USER_TOKEN', token: token })
      },
      setUserPseudo: (pseudo) => {
          dispatch({ type: 'SET_USER_PSEUDO', pseudo: pseudo })
      }
  }
}

const mapStateToProps = state => { 
    return {
        pseudo: state.pseudo,
        token: state.token,
        lang: state.lang
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)