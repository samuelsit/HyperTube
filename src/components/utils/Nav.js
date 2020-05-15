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
                    <div className="block-shadow text-center displayLarge">
                        <button className="btn btn-danger mt-3" value='all' onClick={this.props.genre}>{translate('genre-all')}</button><br/><hr/>
                        <button className="btn btn-danger" value='action' onClick={this.props.genre}>{translate('genre-action')}</button><br/><hr/>
                        <button className="btn btn-danger" value='adventure' onClick={this.props.genre}>{translate('genre-adventure')}</button><br/><hr/>
                        <button className="btn btn-danger" value='animation' onClick={this.props.genre}>{translate('genre-animation')}</button><br/><hr/>
                        <button className="btn btn-danger" value='biography' onClick={this.props.genre}>{translate('genre-biography')}</button><br/><hr/>
                        <button className="btn btn-danger" value='comedy' onClick={this.props.genre}>{translate('genre-comedy')}</button><br/><hr/>
                        <button className="btn btn-danger" value='crime' onClick={this.props.genre}>{translate('genre-crime')}</button><br/><hr/>
                        <button className="btn btn-danger" value='documentary' onClick={this.props.genre}>{translate('genre-documentary')}</button><br/><hr/>
                        <button className="btn btn-danger" value='drama' onClick={this.props.genre}>{translate('genre-drama')}</button><br/><hr/>
                        <button className="btn btn-danger" value='family' onClick={this.props.genre}>{translate('genre-family')}</button><br/><hr/>
                        <button className="btn btn-danger" value='fantasy' onClick={this.props.genre}>{translate('genre-fantasy')}</button><br/><hr/>
                        <button className="btn btn-danger" value='history' onClick={this.props.genre}>{translate('genre-history')}</button><br/><hr/>
                        <button className="btn btn-danger" value='horror' onClick={this.props.genre}>{translate('genre-horror')}</button><br/><hr/>
                        <button className="btn btn-danger" value='music' onClick={this.props.genre}>{translate('genre-music')}</button><br/><hr/>
                        <button className="btn btn-danger" value='mystery' onClick={this.props.genre}>{translate('genre-mystery')}</button><br/><hr/>
                        <button className="btn btn-danger" value='romance' onClick={this.props.genre}>{translate('genre-romance')}</button><br/><hr/>
                        <button className="btn btn-danger" value='sci-fi' onClick={this.props.genre}>{translate('genre-sci-fi')}</button><br/><hr/>
                        <button className="btn btn-danger" value='sport' onClick={this.props.genre}>{translate('genre-sport')}</button><br/><hr/>
                        <button className="btn btn-danger" value='thriller' onClick={this.props.genre}>{translate('genre-thriller')}</button><br/><hr/>
                        <button className="btn btn-danger" value='war' onClick={this.props.genre}>{translate('genre-war')}</button><br/><hr/>
                        <button className="btn btn-danger" value='western' onClick={this.props.genre}>{translate('genre-western')}</button><br/><hr/>
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