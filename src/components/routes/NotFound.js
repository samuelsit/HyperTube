import React, { Component } from 'react'
import Header from '../utils/Header'
import { connect } from 'react-redux'
import translate from '../../i18n/translate'
import { I18nProvider, LOCALES } from '../../i18n'

class NotFound extends Component {
    render () {
        return (
            <I18nProvider locale={this.props.lang === 'fr' ? LOCALES.FRENCH : LOCALES.ENGLISH }>
                <Header/>
                <div className="grad-block">
                    <div className="container container-log">
                        <div className="row">
                            <div className="col login-sec">
                                <h2 className="text-center">{translate('404-error')}</h2>
                                <h3 className="text-center">{translate('404-error-message')}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </I18nProvider>
        )
    }
}

const mapStateToProps = state => { 
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(NotFound)