import React, { Component, Fragment } from 'react'
import Header from './Header'
import '../css/Registration.css'
import galerie from '../img/galerie.png'

class Registration extends Component {

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true
        this.slideGalerie()
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                <Header/>
                <div className="login-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 login-sec">
                                <h2 className="text-center">Connectez vous !</h2>
                                <form className="login-form">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Pseudo</label>
                                        <input type="text" className="form-control" placeholder="" id="exampleInputEmail1"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Mot de passe</label>
                                        <input type="password" className="form-control" placeholder="" id="exampleInputPassword1"/>
                                    </div>
                                    <div className="form-check">
                                        <button type="submit" className="btn btn-login float-right">Connexion</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-8 banner-sec">
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

export default Registration