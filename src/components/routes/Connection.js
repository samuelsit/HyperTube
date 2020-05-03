import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import '../../css/Connection.css'
import galerie from '../../img/galerie.png'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import GoogleLogin from 'react-google-login'
import textLogo from '../../img/text.png'
// import axios from 'axios'

class Connection extends Component {

    _isMounted = false;

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
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        }
        if (this.state.pseudo !== '' && this.state.password !== '' && this.state.erreur === 'Veuillez entrer tous les champs') {
            this.setState({ erreur: '' })
        }
    }

    handleChange = e => {
        const input = e.target
        if (input.id === 'pseudo') {
            if (this._isMounted) {
                this.setState({pseudo: input.value}, this.handleVerify(input.id, input.value))
            }
        }
        if (input.id === 'password') {
            if (this._isMounted) {
                this.setState({password: input.value}, this.handleVerify(input.id, input.value))
            }
        }
    }

    handleOnSubmit = e => {
        e.preventDefault()
        if (this.state.isCorrectPseudo === 'is-valid' && this.state.isCorrectPassword === 'is-valid' && this._isMounted) {
            // axios
            // .post('http://localhost:5000/api', {
            //     username: this.props.pseudo,
            //     password: this.props.password
            // }, {headers: { "x-access-token": this.props.token }})
            // .then(res => {
            //     if (res === true) {
                    this.props.setUserIsAuth(true)
                    this.props.setUserPseudo(this.state.pseudo)
                    this.setState({redirect: true})
            //     }
            //     else {
            //         this.setState({ isCorrectPseudo: 'is-invalid', isCorrectPassword: 'is-invalid', erreur: 'Mauvais pseudo/mot de passe.' })
            //     }
            // })
        }
        if (this.state.isCorrectPseudo !== 'is-valid' && this._isMounted) {
            if (this.state.pseudo === '') {
                this.setState({ isCorrectPseudo: 'is-invalid', erreur: 'Veuillez entrer tous les champs' })
            }
        }
        if (this.state.isCorrectPassword !== 'is-valid' && this._isMounted) {
            if (this.state.password === '') {
                this.setState({ isCorrectPassword: 'is-invalid', erreur: 'Veuillez entrer tous les champs' })
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

    slideGalerie = () => {
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

    responseGoogleSuccess = (response) => {        
        // axios
        // .post('http://localhost:5000/api', {
        //     data: response
        // })
        // .then(res => {
        //     if (res === true) {
                this.props.setUserIsAuth(true)
                this.props.setUserPseudo(response.Pt.Ad)
                this.setState({redirect: true})
        //     }
        //     else {
        //         this.setState({ erreur: 'Erreur Google Auth.' })
        //     }
        // })
    }

    responseGoogleError = (response) => {
        console.error(response)
        this.setState({ erreur: 'Erreur Google Auth.' })
    }

    render () {
        return (
            <Fragment>
                {this.handleRedirect()}
                <Header/>
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames="fade"
                >
                <div className="grad-block">
                    <div className="container container-log">
                        <div className="row">
                            <div className="col login-sec">
                                <h2 className="text-center shadow-theme">Connectez vous !</h2>
                                <form className="login-form" onSubmit={this.handleOnSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Pseudo</label>
                                        <input type="text" className={`form-control ${this.state.isCorrectPseudo}`} placeholder="" id="pseudo" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Mot de passe</label>
                                        <input type="password" className={`form-control ${this.state.isCorrectPassword}`} placeholder="" id="password" onChange={this.handleChange}/>
                                    </div>
                                    <div className="font-weight-bold text-danger text-center">{this.state.erreur}</div>
                                    <br/>
                                    <div className="row text-center">
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-danger text-light mb-3" onClick={this.handleOnSubmit}>Connexion</button>
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                        <div className="col-6">
                                            <GoogleLogin
                                                clientId="151746003875-nbn0fr7hjcoctkp8486ujh9q7fqd5ih8.apps.googleusercontent.com"
                                                buttonText="Google"
                                                onSuccess={this.responseGoogleSuccess}
                                                onFailure={this.responseGoogleError}
                                                cookiePolicy={'single_host_origin'}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <GoogleLogin
                                                clientId="151746003875-nbn0fr7hjcoctkp8486ujh9q7fqd5ih8.apps.googleusercontent.com"
                                                buttonText="42"
                                                onSuccess={this.responseGoogleSuccess}
                                                onFailure={this.responseGoogleError}
                                                cookiePolicy={'single_host_origin'}
                                            />
                                        </div>
                                    </div>
                                    <hr/>
                                    <Link to="/inscription" style={{color: 'black'}}>
                                    <p className="text-center">S'inscrire</p>
                                    </Link>
                                    <Link to="/oubli" style={{color: 'black'}}>
                                    <p className="text-center">Mot de passe oublié ?</p>
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
                </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserIsAuth: (isAuth) => {
            dispatch({ type: 'SET_USER_AUTH', isAuth: isAuth })
        },
        setUserPseudo: (pseudo) => {
            dispatch({ type: 'SET_USER_PSEUDO', pseudo: pseudo })
        }
    }
}

export default connect(null, mapDispatchToProps)(Connection)