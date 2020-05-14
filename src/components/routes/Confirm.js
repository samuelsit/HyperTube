import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import Header from '../utils/Header'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import translate from '../../i18n/translate'
import { I18nProvider, LOCALES } from '../../i18n'

class Confirm extends Component {

    _isMounted = false

    state = {
        error: true,
        timeToRedirect: 5,
        redirect: false
    }
    
    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={"/"} />
            )
        }
    }

    componentDidMount = () => {
        this._isMounted = true
        const token = this.props.match.params.token        

        axios
        .post('http://localhost:5000/api/v1/auth/verifyEmail/' + token)
        .then(res => {
            console.log(res)
            if (this._isMounted) {
                this.setState({ error: false })
                this.interval = setInterval(() => {
                    if (this.state.timeToRedirect === 1) {
                        this.setState({
                            redirect: true
                        })
                    }
                    this.setState({
                        timeToRedirect: this.state.timeToRedirect - 1
                    })
                }, 1000)
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.interval);
    }
    
    render () {
        return (
            <I18nProvider locale={this.props.lang === 'fr' ? LOCALES.FRENCH : LOCALES.ENGLISH }>
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
                                <h2 className="text-center shadow-theme">
                                    {
                                        this.state.error === true ? translate('error-verification') : translate('redirection', {time: this.state.timeToRedirect})
                                    }
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                </CSSTransition>
            </I18nProvider>
        )
    }
}

const mapStateToProps = state => { 
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(Confirm)