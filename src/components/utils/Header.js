import React, { Component } from 'react'
import logo from '../../img/logo.png'
import logoText from '../../img/logoText.png'
import '../../css/Header.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {

    handleClick = () => {
        if (this.props.lang === 'fr') {
            this.props.setUserLang('en')
        }
        else {
            this.props.setUserLang('fr')
        }
    }

    handleDisconnect = () => {
        this.props.setUserIsAuth(false)
        this.props.setUserToken('')
        this.props.setUserPseudo('')
    }

    render () {
        if (!this.props.isAuth || !this.props.pseudo) {
            return (
                <header>
                    <nav className="navbar navbar-expand navbar-white bg-light shadow fixed-top" id="navbar">
                        <Link to="/">
                        <div className="navbar-brand logotext">
                            <img src={logoText} height="40" className="d-inline-block align-top logo" alt="logo"/>
                        </div>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"></li>
                            </ul>
                        </div>
                        <label className="btn btn-light mt-2" style={{fontSize: '25px'}} onClick={this.handleClick}><span role="img" aria-label="flag-usa ">{this.props.lang === 'fr' ? '🇺🇸' : '🇫🇷'}</span></label>
                    </nav>
                </header>
            )
        }
        else {
            return (
                <header>
                    <nav className="navbar navbar-expand navbar-white bg-light shadow fixed-top" id="navbar">
                        <Link to="/galerie">
                        <div className="navbar-brand logoAuth d-lg-none">
                            <img src={logo} height="40" className="d-inline-block align-top logo" alt="logo"/>
                        </div>
                        <div className="navbar-brand logoAuthText d-none d-lg-block">
                            <img src={logoText} height="40" className="d-inline-block align-top logo" alt="logo"/>
                        </div>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"></li>
                            </ul>
                        </div>
                        {this.props.selectVal
                        ?
                        <div className="searchbar mr-1">
                            <input id="search" className="searchhead search_input" type="text" placeholder="Rechercher un film..." onChange={this.props.selectVal}/>
                            <div className="search_icon"><label htmlFor="search"><i className="mt-3 fas fa-search"></i></label></div>
                        </div>
                        :
                        ''
                        }
                        <Link to="/utilisateurs">
                        <div className="text-light btn btn-light mr-1"><i className="fas fa-bookmark text-danger"></i></div>
                        </Link>
                        <Link to={`/profil/${this.props.pseudo}`}>
                        <div className="text-light btn btn-secondary mr-1"><i className="fas fa-user"></i></div>
                        </Link>
                        <Link to="/parametres">
                        <button className="btn btn-secondary mr-1"><i className="fas fa-cogs"></i></button>
                        </Link>
                        <Link to="/">
                        <div className="text-light btn btn-danger mr-1" onClick={this.handleDisconnect}><i className="fas fa-sign-out-alt"></i></div>
                        </Link>
                        <label className="btn btn-light mt-2" style={{fontSize: '25px'}} onClick={this.handleClick}><span role="img" aria-label="flag-usa ">{this.props.lang === 'fr' ? '🇺🇸' : '🇫🇷'}</span></label>
                    </nav>
                </header>
            )
        }
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
        setUserLang: (lang) => {
            dispatch({ type: 'SET_USER_LANG', lang: lang })
        }
    }
}

const mapStateToProps = state => { 
    return {
        isAuth: state.isAuth,
        pseudo: state.pseudo,
        lang: state.lang
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)