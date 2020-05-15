import React, { Component } from 'react'
import Header from '../utils/Header'
import '../../css/Profile.css'
import { CSSTransition } from 'react-transition-group'
import Carousel from '../utils/Carousel'
import axios from 'axios'
import { connect } from 'react-redux'
import translate from '../../i18n/translate'
import { I18nProvider, LOCALES } from '../../i18n'
import { Redirect } from 'react-router-dom'

class Profile extends Component {

    _isMounted = false

    state = {
        watched_movies: [],
        liked_movies: [],
        picture: '',
        redirect: false
    }

    componentDidMount() {        
        this._isMounted = true
        this.getLikes()
    }

    componentDidUpdate(previousProps, previousState) {
        if (this.props.location.key !== previousProps.location.key) {
            this.getLikes()
        }
    }

    getLikes = async () => {
        axios.get('http://localhost:5000/api/v1/profile/' + this.props.match.params.pseudo, { headers: { token: this.props.token }})
        .then(res => {
            let {picture, likes} = res.data.response
            this.setState({picture: picture !== '' ? /^https.+/.test(picture) === true ? picture : `/pictures/${picture}` : '/pictures/noPic.png' }, this.handleLike(likes))
        })
        .catch(error => {
            console.error(error);
            this.setState({redirect: true})
        })
    }

    handleLike = likes => {
        let liked_movies = []
        likes.map(el => {
            axios.get('https://yts.mx/api/v2/movie_details.json?movie_id=' + el.movie_id)
            .then(res => {    
                let {movie} = res.data.data
                movie.yt_trailer_code = new Date(el.date)
                liked_movies.push(movie)
                this.setState({liked_movies}, this.sortLike)
            })
            return true
        })
    }

    sortLike = () => {
        let {liked_movies} = this.state
        liked_movies.sort((a, b) => (b.yt_trailer_code - a.yt_trailer_code))
        this.setState({liked_movies})
    }

    handleRedirect = () => {
        return this.state.redirect ? <Redirect to="/" /> : null
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        return (
            <I18nProvider locale={this.props.lang === 'fr' ? LOCALES.FRENCH : LOCALES.ENGLISH }>
                {this.handleRedirect()}
                <Header/>
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={600}
                    classNames="fade"
                >
                <div className="grad-block">
                    <div className="container container-log pb-lg-5">
                        <div className="row row-header">
                            <div className="mx-auto">
                                <img className="image-profile" alt="Profile" src={this.state.picture}/>
                            </div>
                        </div>
                        <div className="row page">
                            <div className="login-sec mx-auto">
                                <h2 className="text-center">{this.props.match.params.pseudo}</h2>
                            </div>
                        </div>
                        <div className="card p-3 row m-lg-1 mt-lg-5 mt-5">
                            <h4 className="font-weight-bold"><i className="far fa-clock h2" style={{color: '#DD3444'}}></i> {translate('seen')}</h4>
                            {/* <Carousel movies={this.state.watched_movies} /> */}
                        </div>
                        <div className="card p-3 row m-lg-1">
                            <h4 className="font-weight-bold"><i className="far fa-heart h2" style={{color: '#DD3444'}}></i> {translate('liked')}</h4>
                            <Carousel movies={this.state.liked_movies} />
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
        pseudo: state.pseudo,
        token: state.token,
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(Profile)