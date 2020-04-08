import React, { Component, Fragment } from 'react'
import Header from './Header'
import '../css/Connection.css'
import galerie from '../img/galerie.png'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class Connection extends Component {

    _isMounted = false;

    state = {
        redirect: false
    }

    componentDidMount() {
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

    render () {
        return (
            <Fragment>
                {this.handleRedirect()}
                <Header/>
                <div className="grad-block">
                    <div className="container-fluid container-log">
                        <div className="row">
                            <div className="col-md-4 login-sec">
                                <h2 className="text-center">Connectez vous !</h2>
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
                                        <button type="submit" className="btn btn-login float-right" onClick={this.handleOnSubmit}>Connexion</button>
                                    </div>
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