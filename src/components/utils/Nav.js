import React, { Component } from 'react'
import '../../css/Nav.css'
import { I18nProvider, LOCALES } from '../../i18n'
import translate from '../../i18n/translate'
import { connect } from 'react-redux'

class Nav extends Component {
    render () {
        return (
            <I18nProvider locale={this.props.lang === 'fr' ? LOCALES.FRENCH : LOCALES.ENGLISH }>
                <div className="mr-lg-4 m-0 p-0 col-lg-2 mb-5 mb-lg-0 displaySmall">
                    <label htmlFor="select" className="w-100">
                        <div className="block-shadow text-center">
                            <select id="select" className="my-4 selectFilms text-center" onChange={this.props.genre}>
                                {/* <option value='all'>{translate('genre-all')}</option>
                                <option value='action'>{translate('genre-action')}</option>
                                <option value='adventure'>{translate('genre-adventure')}</option>
                                <option value='animation'>{translate('genre-animation')}</option>
                                <option value='biography'>{translate('genre-biography')}</option>
                                <option value='comedy'>{translate('genre-comedy')}</option>
                                <option value='crime'>{translate('genre-crime')}</option>
                                <option value='documentary'>{translate('genre-documentary')}</option>
                                <option value='drama'>{translate('genre-drama')}</option>
                                <option value='family'>{translate('genre-family')}</option>
                                <option value='fantasy'>{translate('genre-fantasy')}</option>
                                <option value='history'>{translate('genre-history')}</option>
                                <option value='horror'>{translate('genre-horror')}</option>
                                <option value='music'>{translate('genre-music')}</option>
                                <option value='mystery'>{translate('genre-mystery')}</option>
                                <option value='romance'>{translate('genre-romance')}</option>
                                <option value='sci-fi'>{translate('genre-sci-fi')}</option>
                                <option value='sport'>{translate('genre-sport')}</option>
                                <option value='thriller'>{translate('genre-thriller')}</option>
                                <option value='war'>{translate('genre-war')}</option>
                                <option value='western'>{translate('genre-western')}</option> */}
                                    <option value='all'>All</option>
                                    <option value='action'>Action</option>
                                    <option value='adventure'>Adventure</option>
                                    <option value='animation'>Animation</option>
                                    <option value='biography'>Biography</option>
                                    <option value='comedy'>Comedy</option>
                                    <option value='crime'>Crime</option>
                                    <option value='documentary'>Documentary</option>
                                    <option value='drama'>Drama</option>
                                    <option value='family'>Family</option>
                                    <option value='fantasy'>Fantasy</option>
                                    <option value='history'>History</option>
                                    <option value='horror'>Horror</option>
                                    <option value='music'>Music</option>
                                    <option value='mystery'>Mystery</option>
                                    <option value='romance'>Romance</option>
                                    <option value='sci-fi'>Sci-Fi</option>
                                    <option value='sport'>Sport</option>
                                    <option value='thriller'>Thriller</option>
                                    <option value='war'>War</option>
                                    <option value='western'>Western</option>
                            </select>
                        </div>
                    </label>
                </div>
                <div className="mr-lg-4 col-lg-2 mb-5 mb-lg-0 displayLarge">
                    <div className="block-shadow text-center displayLarge p-4">
                        <button className="btn btn-block btn-danger" value='all' onClick={this.props.genre}>{translate('genre-all')}</button>
                        <button className="btn btn-block btn-danger" value='action' onClick={this.props.genre}>{translate('genre-action')}</button>
                        <button className="btn btn-block btn-danger" value='adventure' onClick={this.props.genre}>{translate('genre-adventure')}</button>
                        <button className="btn btn-block btn-danger" value='animation' onClick={this.props.genre}>{translate('genre-animation')}</button>
                        <button className="btn btn-block btn-danger" value='biography' onClick={this.props.genre}>{translate('genre-biography')}</button>
                        <button className="btn btn-block btn-danger" value='comedy' onClick={this.props.genre}>{translate('genre-comedy')}</button>
                        <button className="btn btn-block btn-danger" value='crime' onClick={this.props.genre}>{translate('genre-crime')}</button>
                        <button className="btn btn-block btn-danger" value='documentary' onClick={this.props.genre}>{translate('genre-documentary')}</button>
                        <button className="btn btn-block btn-danger" value='drama' onClick={this.props.genre}>{translate('genre-drama')}</button>
                        <button className="btn btn-block btn-danger" value='family' onClick={this.props.genre}>{translate('genre-family')}</button>
                        <button className="btn btn-block btn-danger" value='fantasy' onClick={this.props.genre}>{translate('genre-fantasy')}</button>
                        <button className="btn btn-block btn-danger" value='history' onClick={this.props.genre}>{translate('genre-history')}</button>
                        <button className="btn btn-block btn-danger" value='horror' onClick={this.props.genre}>{translate('genre-horror')}</button>
                        <button className="btn btn-block btn-danger" value='music' onClick={this.props.genre}>{translate('genre-music')}</button>
                        <button className="btn btn-block btn-danger" value='mystery' onClick={this.props.genre}>{translate('genre-mystery')}</button>
                        <button className="btn btn-block btn-danger" value='romance' onClick={this.props.genre}>{translate('genre-romance')}</button>
                        <button className="btn btn-block btn-danger" value='sci-fi' onClick={this.props.genre}>{translate('genre-sci-fi')}</button>
                        <button className="btn btn-block btn-danger" value='sport' onClick={this.props.genre}>{translate('genre-sport')}</button>
                        <button className="btn btn-block btn-danger" value='thriller' onClick={this.props.genre}>{translate('genre-thriller')}</button>
                        <button className="btn btn-block btn-danger" value='war' onClick={this.props.genre}>{translate('genre-war')}</button>
                        <button className="btn btn-block btn-danger" value='western' onClick={this.props.genre}>{translate('genre-western')}</button>
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

export default connect(mapStateToProps, null)(Nav)