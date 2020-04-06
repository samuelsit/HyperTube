import React, { Component } from 'react'
import logo from '../img/logo.png'
import logoText from '../img/logoText.png'
import '../css/Header.css'

class Header extends Component {

    state = {
        isAuth: false,
        width: window.innerWidth
    }

    handleClick = () => {
        this.setState(this.state.isAuth === false ? {isAuth: true} : {isAuth: false})        
    }

    render () {
        if (this.state.isAuth === false) {
            return (
                <header>
                    <nav className="navbar navbar-expand navbar-light bg-light shadow fixed-top" id="navbar">
                        <div className="navbar-brand logotext">
                            <img src={logoText} height="40" className="d-inline-block align-top" alt="logo"/>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"></li>
                            </ul>
                        </div>
                        <div className="text-light btn btn-secondary mr-2" onClick={this.handleClick}>Connexion</div>
                    </nav>
                </header>
            )
        }
        else {
            return (
                <header>
                    <nav className="navbar navbar-expand navbar-light bg-light shadow fixed-top" id="navbar">
                        <div className="navbar-brand logoAuth">
                            <img src={logo} height="40" className="d-inline-block align-top" alt="logo"/>
                        </div>
                        <div className="navbar-brand logoAuthText">
                            <img src={logoText} height="40" className="d-inline-block align-top" alt="logo"/>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"></li>
                            </ul>
                        </div>
                        <div className="searchbar mr-1">
                            <input className="search_input" type="text" placeholder="Search..."/>
                            <div className="search_icon"><i className="fas fa-search"></i></div>
                        </div>
                        <div className="text-light btn btn-light mr-2"><i className="fas fa-heart text-danger"></i></div>
                        <div className="text-light btn btn-secondary mr-2"><i className="fas fa-user"></i></div>
                        <div className="text-light btn btn-danger mr-2" onClick={this.handleClick}>Déconnexion</div>
                    </nav>
                </header>
            )
        }
    }
}

export default Header