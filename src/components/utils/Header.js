import React, { Component } from 'react'
import logo from '../../img/logo.png'
import logoText from '../../img/logoText.png'
import '../../css/Header.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {

    handleClick = () => {
        this.props.setUserIsAuth(false)
        this.setState({isAuth: false})        
    }

    render () {
        if (this.props.isAuth === false) {
            return (
                <header>
                    <nav className="navbar navbar-expand navbar-light bg-light shadow fixed-top" id="navbar">
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
                    </nav>
                </header>
            )
        }
        else {
            return (
                <header>
                    <nav className="navbar navbar-expand navbar-light bg-light shadow fixed-top" id="navbar">
                        <Link to="/galerie">
                        <div className="navbar-brand logoAuth">
                            <img src={logo} height="40" className="d-inline-block align-top logo" alt="logo"/>
                        </div>
                        <div className="navbar-brand logoAuthText">
                            <img src={logoText} height="40" className="d-inline-block align-top logo" alt="logo"/>
                        </div>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"></li>
                            </ul>
                        </div>
                        <div className="searchbar mr-1">
                            <input className="search_input" type="text" placeholder="Rechercher un film..."/>
                            <div className="search_icon"><i className="fas fa-search"></i></div>
                        </div>
                        <div className="text-light btn btn-light mr-2"><i className="fas fa-heart text-danger"></i></div>
                        <div className="text-light btn btn-secondary mr-2"><i className="fas fa-user"></i></div>
                        <Link to="/">
                        <div className="text-light btn btn-danger mr-2" onClick={this.handleClick}>Déconnexion</div>
                        </Link>
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
        }
    }
}

const mapStateToProps = state => { 
    return {
        isAuth: state.isAuth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)