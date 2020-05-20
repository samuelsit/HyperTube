import React, { Component } from 'react'
import Header from '../utils/Header'
import axios from 'axios'
import { I18nProvider, LOCALES } from '../../i18n'
import translate from '../../i18n/translate'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import { pageVariant, pageTransition } from '../../css/motion'

class Forgot extends Component {

    state = {
        email: '',
        verify: ''
    }

    _isMounted = false

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {   
        this._isMounted = true
    }

    handleChange = event => {
        const email = event.target.value
        if (this._isMounted) {
            this.setState({ email: email, verify: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false ? 'is-invalid' : 'is-valid' })
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const {email, verify} = this.state

        if (verify === 'is-valid') {
            console.log(email);
            axios
            .post('http://localhost:5000/api/v1/auth/forgotPassword', {
                email: email
            })
            .then(res => {
                console.log(res)
            })
        }
    }

    render () {
        return (
            <I18nProvider locale={this.props.lang === 'fr' ? LOCALES.FRENCH : LOCALES.ENGLISH }>
                <Header />
                <motion.div 
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariant}
                transition={pageTransition}
                className="grad-block">
                    <div className="container container-log">
                        <div className="row">
                            <div className="col login-sec">
                                <form className="" onSubmit={this.handleSubmit}>
                                    <h2 className="text-center shadow-theme">{translate('your-email')}</h2>
                                    <input type="email" id="email" placeholder="name@exemple.com" className={`form-control w-50 text-center mx-auto mb-3 ${this.state.verify}`} onChange={this.handleChange}/>
                                    <div className="mx-auto text-center">
                                        <button type="submit" className="btn btn-danger text-light mt-4">{translate('receive-email')}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </I18nProvider>
        )
    }
}

const mapStateToProps = state => { 
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(Forgot)