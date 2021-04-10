import React, { Component } from 'react'
import Header from '../utils/Header'
import '../../css/Connection.css'
import galerie from '../../img/galerie.png'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import textLogo from '../../img/text.png'
import axios from 'axios'
import Logo42 from '../../img/42_Logo.png'
import { I18nProvider, LOCALES } from '../../i18n'
import translate from '../../i18n/translate'
import { motion } from 'framer-motion'
import { pageVariant, pageTransition } from '../../css/motion'

class Connection extends Component {

    _isMounted = false

    state = {
        pseudo: '',
        password: '',
        isCorrectPseudo: '',
        isCorrectPassword: '',
        erreur: '',
        redirect: false
    }

    componentDidMount() {
        this._isMounted = true
        this.slideGalerie()
        this.handleFtOauth()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleVerify = (name, value) => {
        if (this._isMounted) {
            if (name === 'pseudo') {
                let reg = value.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,15}$/igm)
                if (reg === null) {
                    this.setState({isCorrectPseudo: 'is-invalid'})
                }
                else {
                    this.setState({isCorrectPseudo: 'is-valid'})
                }
            }
            if (name === 'password') {
                let reg = value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
                if (reg === null) {
                    this.setState({isCorrectPassword: 'is-invalid'})
                }
                else {
                    this.setState({isCorrectPassword: 'is-valid'})
                }
            }
            if (this.state.pseudo !== '' && this.state.password !== '' && this.state.erreur === 'Veuillez entrer tous les champs') {
                this.setState({ erreur: '' })
            }
        }
    }

    handleChange = e => {
        if (this._isMounted) {
            const input = e.target
            if (input.id === 'pseudo') {
                this.setState({pseudo: input.value}, this.handleVerify(input.id, input.value))
            }
            if (input.id === 'password') {
                this.setState({password: input.value}, this.handleVerify(input.id, input.value))
            }
        }
    }

    handleOnSubmit = e => {
        e.preventDefault()
        if (this._isMounted) {
            if (this.state.isCorrectPseudo === 'is-valid' && this.state.isCorrectPassword === 'is-valid') {
                axios
                .post('http://localhost:5000/api/v1/auth/login', {
                    pseudo: this.state.pseudo,
                    password: this.state.password
                })
                .then(res => {
                    this.props.setUserIsAuth(true)
                    this.props.setUserToken(res.data.token)
                    this.props.setUserPseudo(res.data.user.pseudo)
                    this.props.setUserSrc('yts')
                    this.props.setCurrentTorrent(0)
                    this.setState({redirect: true})
                })
                .catch(error => {
                    console.error(error)
                    this.setState({ isCorrectPassword: 'is-invalid', erreur: 'Erreur à la connexion' })
                })
            }
            if (this.state.isCorrectPseudo !== 'is-valid') {
                if (this.state.pseudo === '') {
                    this.setState({ isCorrectPseudo: 'is-invalid', erreur: 'Veuillez entrer tous les champs' })
                }
            }
            if (this.state.isCorrectPassword !== 'is-valid') {
                if (this.state.password === '') {
                    this.setState({ isCorrectPassword: 'is-invalid', erreur: 'Veuillez entrer tous les champs' })
                }
            }
        }
    }

    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={"/galerie"} />
            )
        }
    }

    handleFtOauth = () => {
      const query = new URLSearchParams(this.props.location.search);
      if (query.get('code')) {
        console.log(query.get('code'));
        if (this._isMounted) {
          axios
          .post('http://localhost:5000/api/v1/auth/ftoauth', {
              code: query.get('code')
          })
          .then(res => {
              this.props.setUserIsAuth(true)
              this.props.setUserToken(res.data.token)
              this.props.setUserPseudo(res.data.user.pseudo)
              this.props.setUserSrc('yts')
              this.props.setCurrentTorrent(0)
              this.setState({redirect: true})
          })
          .catch(error => {
              console.error(error)
              this.setState({ erreur: 'Erreur 42 Auth.' })
              // return (
              //   <Redirect to={"/"} />
              // )
          })
        }
      }
    }

    slideGalerie = () => {
        if (this._isMounted) {
            const galerie = document.getElementById("galerie")
            let top = 0
            setInterval(() => {
                if (top === -550) {
                    top = 0
                }
                else {
                    top -= 0.5
                }
                galerie.style.top = top + 'px'
            }, 20)
        }
    }

    responseGoogleSuccess = (response) => {
        if (this._isMounted) {
            axios
            .post('http://localhost:5000/api/v1/auth/googleoauth', {
                id_token: response.tokenObj.id_token
            })
            .then(res => {                
                this.props.setUserIsAuth(true)
                this.props.setUserToken(res.data.token)
                this.props.setUserPseudo(res.data.user.pseudo)
                this.props.setUserSrc('yts')
                this.props.setCurrentTorrent(0)
                this.setState({redirect: true})
            })
            .catch(error => {
                console.error(error)
                this.setState({ erreur: 'Erreur Google Auth.' })
            })
        }
    }

    responseGoogleError = (response) => {
        console.error(response)
        if (this._isMounted) {
            this.setState({ erreur: 'Erreur Google Auth.' })
        }
    }

    render () {
        return (
            <I18nProvider locale={this.props.lang === 'fr' ? LOCALES.FRENCH : LOCALES.ENGLISH }>
                {this.handleRedirect()}
                <Header/>
                <motion.div 
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariant}
                transition={pageTransition}
                className="grad-block">
                    <div className="container container-log">
                        <div className="row">
                            <div className="col login-sec">
                                <h2 className="text-center shadow-theme">{translate('connect')}</h2>
                                <form className="login-form" onSubmit={this.handleOnSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="text-uppercase">{translate('pseudo')}</label>
                                        <input type="text" className={`form-control ${this.state.isCorrectPseudo}`} placeholder="" id="pseudo" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1" className="text-uppercase">{translate('password')}</label>
                                        <input type="password" className={`form-control ${this.state.isCorrectPassword}`} placeholder="" id="password" onChange={this.handleChange}/>
                                    </div>
                                    <div className="font-weight-bold text-danger text-center">{this.state.erreur}</div>
                                    <br/>
                                    <div className="row text-center">
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-danger text-light mb-3" onClick={this.handleOnSubmit}>{translate('connection')}</button>
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                        <div className="col-6">
                                            <GoogleLogin
                                                clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE}
                                                buttonText="Google"
                                                onSuccess={this.responseGoogleSuccess}
                                                onFailure={this.responseGoogleError}
                                                cookiePolicy={'single_host_origin'}
                                            />
                                        </div>
                                        <div className="col-6">
                                          <a className="btn btn-white oauth-42" href="https://api.intra.42.fr/oauth/authorize?client_id=d3f78a661206accafdeedd5e56d51f978f145000e5ac136ad21220f0b387ae4d&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code">
                                            <img id="42" src={Logo42} alt="42-authentificaton" className="img-fluid" width="30px"/><span className="text-secondary ml-3">42</span>
                                          </a>
                                        </div>
                                    </div>
                                    <hr/>
                                    <Link to="/inscription" style={{color: 'black'}}>
                                    <p className="text-center">{translate('register')}</p>
                                    </Link>
                                    <Link to="/oubli" style={{color: 'black'}}>
                                    <p className="text-center">{translate('forget')}</p>
                                    </Link>
                                </form>
                            </div>
                            <div className="slider col-md-8 banner-sec">
                                <div id="" className="carousel slide">
                                    <div className="carousel-inner">
                                        <div className="active">
                                            <img id="galerie" className="d-block img-fluid" width="110%" src={galerie} alt="movie galery"/>
                                            <div className="carousel-caption d-none d-md-block">
                                                <div className="banner-text">
                                                    <img src={textLogo} className="img-fluid" alt="hypertube" />
                                                </div>	
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </I18nProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserIsAuth: (isAuth) => {
            dispatch({ type: 'SET_USER_AUTH', isAuth: isAuth })
        },
        setUserToken: (token) => {
            dispatch({ type: 'SET_USER_TOKEN', token: token })
        },
        setUserPseudo: (pseudo) => {
            dispatch({ type: 'SET_USER_PSEUDO', pseudo: pseudo })
        },
        setUserSrc: (src) => {
            dispatch({ type: 'SET_USER_SRC', src: src })
        },
        setCurrentTorrent: (currentTorrent) => {
            dispatch({ type: 'SET_CURRENT_TORRENT', currentTorrent: currentTorrent })
        }
    }
}

const mapStateToProps = state => { 
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connection)