import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import axios from 'axios'
import '../../css/Film.css'
import Cover from '../utils/Cover'
import { connect } from 'react-redux'
import { I18nProvider, LOCALES } from '../../i18n'
import translate from '../../i18n/translate'

class Film extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: [],
            genre: [],
            suggestion: [],
            intervalId: 0,
            isLike: false,
            comment: '',
            comments: []
        }
        this.Chat = React.createRef()
    }

    _isMounted = false

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {   
        this._isMounted = true
        window.scrollTo(0, 0)
        axios.get('https://yts.mx/api/v2/movie_details.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
            if (this._isMounted) {
                this.setState({movie: res.data.data.movie, genre: res.data.data.movie.genres})
                axios
                .get('http://localhost:5000/api/v1/film/comment/' + this.props.match.params.id, { headers: { token: this.props.token }})
                .then(res => {
                    this.setState({comments: res.data})
                })
                .catch(error => {
                    console.error(error)
                })
                axios
                .get('http://localhost:5000/api/v1/film/like/' + this.props.match.params.id, { headers: { token: this.props.token }})
                .then(res => {
                    this.setState({isLike: res.data})
                })
                .catch(error => {
                    console.error(error)
                })
            }
        })
        axios.get('https://yts.mx/api/v2/movie_suggestions.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
            if (this._isMounted) {
                this.setState({suggestion: res.data.data.movies})
            }
        })
    }

    componentDidUpdate(previousProps, previousState) {
        this.Chat.current.scrollTo({
            top: 999999,
            left: 0,
            behavior: 'smooth'
        })
        if (previousProps !== this.props) {
            if (document.referrer.match(/localhost:3000\/film\/\d+/)) {                                
                window.scrollTo(0, 0)
                console.log(`[${this.props.match.params.id}] New film on update`);
                axios.get('https://yts.mx/api/v2/movie_details.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
                    if (this._isMounted) {
                        this.setState({movie: res.data.data.movie, genre: res.data.data.movie.genres})
                    }
                })
                axios.get('https://yts.mx/api/v2/movie_suggestions.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
                    if (this._isMounted) {
                        this.setState({suggestion: res.data.data.movies})
                    }
                })
                axios
                .get('http://localhost:5000/api/v1/film/comment/' + this.props.match.params.id, { headers: { token: this.props.token }})
                .then(res => {
                    this.setState({comments: res.data})
                })
                .catch(error => {
                    console.error(error)
                })
                axios
                .get('http://localhost:5000/api/v1/film/like/' + this.props.match.params.id, { headers: { token: this.props.token }})
                .then(res => {
                    this.setState({isLike: res.data})
                })
                .catch(error => {
                    console.error(error)
                })
            }
        }
    }

    handleChange = e => {
        this.setState({comment: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({comment: ''})
        axios
        .post('http://localhost:5000/api/v1/film/comment', {
            movie_id: this.props.match.params.id,
            value: this.state.comment
        }, { headers: { token: this.props.token }})
        .then(res => {
            axios
            .get('http://localhost:5000/api/v1/film/comment/' + this.props.match.params.id, { headers: { token: this.props.token }})
            .then(res => {
                this.setState({comments: res.data})
                this.Chat.current.scrollTo({
                    top: 999999,
                    left: 0,
                    behavior: 'smooth'
                })
            })
            .catch(error => {
                console.error(error)
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    handleLike = () => {
        let { isLike, movie } = this.state
        let { token } = this.props
        this.setState({isLike: !isLike})
        if (!isLike) {
            axios
            .post('http://localhost:5000/api/v1/film/like', {
                movie_id: this.props.match.params.id,
                movie_title: movie.title
            }, { headers: { token: token }})
            .catch(error => {
                console.error(error)
            })
        }
        else {
            axios
            .delete('http://localhost:5000/api/v1/film/dislike', {
              data: {
                movie_id: this.props.match.params.id
              },
              headers: { token: token }
            })
            .catch(error => {
                console.error(error)
            })
        }
    }

    // handleView = () => {
    //     if (firstview) {
    //         axios
    //         .post('http://localhost:5000/api/v1/film/view', {
    //             movie_id: this.props.match.params.id
    //         }, { headers: { token: token }})
    //         .catch(error => {
    //             console.error(error)
    //         })
    //     }
    // }

    handleDelCom = e => {
        if (window.confirm("Souhaitez-vous vraiment supprimer votre commentaire?")) {
            axios
            .delete('http://localhost:5000/api/v1/film/comment',  {
              data: {
                comment_id: e.target.id,
              },
              headers: { token: this.props.token }
            })
            .then(res => {
              axios
              .get('http://localhost:5000/api/v1/film/comment/' + this.props.match.params.id, { headers: { token: this.props.token }})
              .then(res => {
                  this.setState({comments: res.data})
                  this.Chat.current.scrollTo({
                      top: 999999,
                      left: 0,
                      behavior: 'smooth'
                  })
              })
            })
            .catch(error => {
                console.error(error)
            })
        }
    }

    render () {
        let {movie, genre, isLike} = this.state
        var date = new Date(movie.date_uploaded_unix * 1000)
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var day = date.getDate();
        var month = months_arr[date.getMonth()];
        var year = date.getFullYear();
        const suggestion = this.state.suggestion.map((el, i) => {
            return (
                <Cover key={i} film={el} suggestion={true} />
            )
        })
        let comments = this.state.comments.map((el, i) => {
            return (
                <Fragment key={i}>
                    <hr/><p className="comment">{el.patron_id === this.props.pseudo ? <i onClick={this.handleDelCom} id={el.comment_id} className="far fa-times-circle text-danger mt-2"></i> : null} <span className="text-secondary">{el.date.replace(/-/g, ' ')}</span> - <span className={`font-weight-bold ${el.patron_id === this.props.pseudo ? 'text-danger' : 'text-dark' }`}>{el.patron_id}</span>: {el.value}</p>
                </Fragment>
            )
        })
        return (
            <I18nProvider locale={this.props.lang === 'fr' ? LOCALES.FRENCH : LOCALES.ENGLISH }>
                <Header/>
                <div className="grad-block">
                    <div className="container container-log">
                        <div className="row">
                            <div className="col login-sec">
                                <div><label onClick={this.handleLike} className={`float-right btn`} style={isLike ? {
                                    position: 'relative',
                                    bottom: '19px',
                                    outline: 'none',
                                    border: '0px',
                                    transition: 'all .3s',
                                    transform: 'scale(3.5)'
                                } : {
                                    position: 'relative',
                                    bottom: '20px',
                                    outline: 'none',
                                    border: '0px',
                                    transition: 'all .3s',
                                    transform: 'scale(3)'
                                }}>{!isLike ? <i className="far fa-heart text-danger"></i> : <i className="fas fa-heart text-danger"></i>}</label></div>
                                <h2 className="text-center">{movie.title}</h2>
                                <br/><br/>
                                <div className="row">
                                    <div className="col-12 text-center col-lg-6">
                                        <img className="img-fluid film text-center" src={movie.large_cover_image} alt="" />
                                    </div>
                                    <div className="col mt-3 mt-lg-0">
                                        <p><span className="data font-weight-bold">Evaluation:</span> {movie.rating}/10</p>
                                        <p><span className="data font-weight-bold">{translate('upload')}:</span> {day && month && year ? day + ' ' + month + ' ' + year : ''}</p>
                                        <p><span className="data font-weight-bold">Genres:</span> {genre.join(', ')}</p>
                                        <p><span className="data font-weight-bold">{translate('language')}:</span> {movie.language}</p>
                                        <p><span className="data font-weight-bold">{translate('duration')}:</span> {movie.runtime} minutes</p>
                                        <p><span className="data font-weight-bold">Description:</span> {movie.description_full}</p>
                                        <p><span className="data font-weight-bold">{translate('trailer')}:</span></p>
                                        <iframe width="100%" src={`https://www.youtube.com/embed/` + movie.yt_trailer_code} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="yt" allowFullScreen></iframe>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col text-center">
                                        <p><span className="data font-weight-bold float-left d-lg-none">{translate('movie')}:</span></p>
                                        <video controls width="100%" className="border"></video>
                                    </div>
                                    <div className="col-12 mt-4">
                                    <div id="chat" ref={this.Chat} className="border shadow p-2">
                                        {comments}
                                    </div>
                                    <form className="form-inline mt-5" onSubmit={this.handleSubmit}><input className="form-control mr-3 w-75 mx-auto" onChange={this.handleChange} value={this.state.comment} /><button className="btn btn-danger mx-auto">{translate('send')}</button></form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container container-log mt-5">
                        <div className="row ml-lg-3">
                            <div className="col login-sec">
                                <h2 className="text-center">{translate('like-also')}</h2>
                                <div className="row">
                                    {suggestion}
                                </div>
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
        token: state.token,
        pseudo: state.pseudo,
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(Film)