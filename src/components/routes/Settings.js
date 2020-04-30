import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import profilePic from '../../pictures/profile1.JPG'
import Cover from '../../pictures/cover1.JPG'
import { CSSTransition } from 'react-transition-group'
import '../../css/Settings.css'

class Settings extends Component {

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
                                        <div className="col">
                                            <label htmlFor="email" className="text-danger h4">Email</label>
                                            <input type="text" className={`form-control`} name="email" id="email" placeholder="Email*" disabled/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="username" className="text-danger h4">Pseudo</label>
                                            <input type="text" className={`form-control`} name="username" id="username" placeholder="Pseudo*" disabled/>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="lastname" className="text-danger h4">Nom</label>
                                            <input type="text" className={`form-control`} id="lastname" name="lastname" placeholder="Nom*"/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="firstname" className="text-danger h4">Prénom</label>
                                            <input type="text" className={`form-control`} id="firstname" name="firstname" placeholder="Prénom*"/>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor="password" className="text-danger h4">Mot de passe</label>
                                            <input type="text" className={`form-control`} id="password" name="password" placeholder="Mot de passe*"/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="repeat" className="text-danger h4">Répéter mot de passe</label>
                                            <input type="text" className={`form-control`} id="repeat" name="repeat" placeholder="Répéter mot de passe*"/>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-12 col-md-6 col-lg-6 text-center">
                                            <div className="text-danger h4">Couverture</div>
                                            <label id="banner" htmlFor="cover"><img className="img-fluid upload" alt="banner" src={Cover} /></label>
                                            <input type="file" className={`form-control d-none`} id="cover"/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 text-center">
                                            <div className="text-danger h4">Profil</div>
                                            <label htmlFor="picture"><img className="img-fluid upload" alt="profile" src={profilePic} /></label>
                                            <input type="file" className={`form-control d-none`} id="picture"/>
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