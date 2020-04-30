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
                                            <input type="text" className={`form-control`} name="email" placeholder="Email*"/>
                                        </div>
                                        <div className="col">
                                            <input type="text" className={`form-control`} name="username" placeholder="Pseudo*"/>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <input type="text" className={`form-control`} name="lastname" placeholder="Nom*"/>
                                        </div>
                                        <div className="col">
                                            <input type="text" className={`form-control`} name="firstname" placeholder="Prénom*"/>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <input type="text" className={`form-control`} name="password" placeholder="Mot de passe*"/>
                                        </div>
                                        <div className="col">
                                            <input type="text" className={`form-control`} name="repeat" placeholder="Répéter mot de passe*"/>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-12 col-md-6 col-lg-6 text-center">
                                            <label htmlFor="picture"><img className="img-fluid border shadow-lg upload" alt="banner" src={Cover} /></label>
                                            <input type="file" className={`form-control d-none`} id="cover"/>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 text-center">
                                            <label htmlFor="picture"><img className="img-fluid border shadow-lg upload" alt="profile" src={profilePic} /></label>
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