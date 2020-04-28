import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import '../../css/Connection.css'
import galerie from '../../img/galerie.png'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import GoogleLogin from 'react-google-login'

class Connection extends Component {

    _isMounted = false;

    state = {
        redirect: false
    }

    componentDidMount() {
        // console.log(require('dotenv').config())
        // console.log(process.env.CLIENT_ID_GOOGLE);

        this._isMounted = true
        this.slideGalerie()                
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleOnSubmit = () => {
        this.props.setUserIsAuth(true)
        this.setState({redirect: true})
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

    responseGoogle = (response) => {
        console.log(response)
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
                            <div className="col-md-4 login-sec">
                                <h2 className="text-center shadow-theme">Connectez vous !</h2>
                                <form className="login-form" onSubmit={this.handleOnSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Pseudo</label>
                                        <input type="text" className="form-control" placeholder="" id="exampleInputEmail1"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Mot de passe</label>
                                        <input type="password" className="form-control" placeholder="" id="exampleInputPassword1"/>
                                    </div>
                                    <div className="form-check">
                                        <button type="submit" className="btn btn-login float-right float-mb-left float-lg-right mb-3 mb-lg-0" onClick={this.handleOnSubmit}>Connexion</button>
                                    </div>
                                    <GoogleLogin
                                        clientId="151746003875-nbn0fr7hjcoctkp8486ujh9q7fqd5ih8.apps.googleusercontent.com" //{process.env.CLIENT_ID_GOOGLE}
                                        buttonText="Connexion"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </form>
                            </div>
                            <div className="slider col-md-8 banner-sec">
                                <div id="" className="carousel slide">
                                    <div className="carousel-inner">
                                        <div className="active">
                                            <img id="galerie" className="d-block img-fluid" src={galerie} alt="First slide"/>
                                            <div className="carousel-caption d-none d-md-block">
                                                <div className="banner-text">
                                                    <h2 className="contour-titre">HyperTube</h2>
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
        }
    }
}

export default connect(null, mapDispatchToProps)(Connection)