import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import axios from 'axios'
import '../../css/Film.css'
import Cover from '../utils/Cover'
import { connect } from 'react-redux'
import { I18nProvider, LOCALES } from '../../i18n'
import translate from '../../i18n/translate'
import { motion } from 'framer-motion'
import { pageVariant, pageTransition } from '../../css/motion'
import { Redirect } from 'react-router-dom'


class Film extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: [],
            episodes: [],
            genre: [],
            suggestion: [],
            intervalId: 0,
            isLike: false,
            comment: '',
            comments: [],
            redirect: false,
            movieSrc: "",
            hash: "",
            subtitle: []
        }
        this.Chat = React.createRef()
    }

    _isMounted = false

    componentWillUnmount() {
        this._isMounted = false
    }

    handleRedirect = () => (
        this.state.redirect ? <Redirect to="/" /> : null
    )

    handleYTS = () => {
        axios.get('https://yts.mx/api/v2/movie_details.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
            if (this._isMounted) {
                if (res.data.data.movie.url === 'https://yts.mx/movie/') {
                    this.setState({redirect: true})
                }
                else {
                    this.setState({movie: res.data.data.movie, genre: res.data.data.movie.genres, hash: res.data.data.movie.torrents[0].hash})
                    console.log(res.data.data.movie)
                }
            }
        })
        axios.get('https://yts.mx/api/v2/movie_suggestions.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
            if (this._isMounted) {
                this.setState({suggestion: res.data.data.movies})
            }
        })
    }

    handleEZTV = () => {
        axios.get('http://www.omdbapi.com/?i=tt' + this.props.match.params.id + '&apikey=' + process.env.REACT_APP_KEY_OMDB, { useCredentails: true }).then(res => {
            if (this._isMounted) {
                if (res.data.Error) {
                    this.setState({redirect: true})
                }
                else {
                    this.setState({movie: res.data})
                    console.log(res.data)
                }
                
            }
        })
        axios.get('https://eztv.io/api/get-torrents?imdb_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
            if (res.data.torrents && this._isMounted) {
                this.setState({episodes: res.data.torrents})
            }
        })
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            if (this.props.match.params.src !== 'eztv' && this.props.match.params.src !== 'yts') {
                this.setState({redirect: true})
            }
        }
        window.scrollTo(0, 0)
        if (this.props.match.params.src === 'yts') {
            this.handleYTS()
        }
        else {
            this.handleEZTV()
        }
        axios
        .get('http://localhost:5000/api/v1/film/comment/' + this.props.match.params.src + '/' + this.props.match.params.id, { headers: { token: this.props.token }})
        .then(res => {
            this.setState({comments: res.data})
        })
        .catch(error => {
            console.error(error)
            this.setState({redirect: true})
        })
        axios
        .get('http://localhost:5000/api/v1/film/like/' + this.props.match.params.src + '/' + this.props.match.params.id, { headers: { token: this.props.token }})
        .then(res => {
            this.setState({isLike: res.data})
        })
        .catch(error => {
            console.error(error)
            this.setState({redirect: true})
        })
        axios
        .get('http://localhost:5000/api/v1/film/file/'+ this.props.match.params.src + "/" + this.props.match.params.id, { headers: { token: this.props.token }})
        .then(res => {
          console.log(res.data);
          if (res.data)
            this.setState({ movieSrc: res.data });
        })
        .catch(error => {
          console.error(error)
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
                if (this.props.match.params.src === 'yts') {
                    this.handleYTS()
                }
                else {
                    this.handleEZTV()
                }
                axios
                .get('http://localhost:5000/api/v1/film/comment/' + this.props.match.params.src + '/' + this.props.match.params.id, { headers: { token: this.props.token }})
                .then(res => {
                    this.setState({comments: res.data})
                })
                .catch(error => {
                    console.error(error)
                    this.setState({redirect: true})
                })
                axios
                .get('http://localhost:5000/api/v1/film/like/' + this.props.match.params.src + '/' + this.props.match.params.id, { headers: { token: this.props.token }})
                .then(res => {
                    this.setState({isLike: res.data})
                })
                .catch(error => {
                    console.error(error)
                    this.setState({redirect: true})
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
            movie_src: this.props.match.params.src,
            value: this.state.comment
        }, { headers: { token: this.props.token }})
        .then(res => {
            axios
            .get('http://localhost:5000/api/v1/film/comment/' + this.props.match.params.src + '/' + this.props.match.params.id, { headers: { token: this.props.token }})
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
                this.setState({redirect: true})
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({redirect: true})
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
                movie_src: this.props.match.params.src,
                movie_title: this.props.match.params.src === 'yts' ? movie.title : movie.Title
            }, { headers: { token: token }})
            .catch(error => {
                console.error(error)
                this.setState({redirect: true})
            })
        }
        else {
            axios
            .delete('http://localhost:5000/api/v1/film/dislike', {
              data: {
                movie_id: this.props.match.params.id,
                movie_src: this.props.match.params.src
              },
              headers: { token: token }
            })
            .catch(error => {
                console.error(error)
                this.setState({redirect: true})
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

    firstView = () => {
      let body = {};
      if (this.props.match.params.src === "yts") {
        body = {
          source: "yts",
          movie_id: this.props.match.params.id,
          title: this.state.movie.title,
          hash: this.state.hash
        }
      } else if (this.props.match.params.src === "eztv") {
        body = {
          source: "eztv", 
          movie_id: this.props.match.params.id,
          title: this.state.movie.title,
          magnet: ""    //don't know where to find eztv magnet url
        }

      }
      axios
      .post('http://localhost:5000/api/v1/film/watch', body, { headers: { token: this.props.token}})
      .then(res => {
        console.log(res);
        this.setState({movieSrc: res.data});
      })
      .catch(error => {
        console.error(error);
      })
    }

    handleDelCom = e => {
        if (window.confirm("Souhaitez-vous vraiment supprimer votre commentaire?")) {
            axios
            .delete('http://localhost:5000/api/v1/film/comment',  {
              data: {
                comment_id: e.target.id,
                movie_src: this.props.match.params.src
              },
              headers: { token: this.props.token }
            })
            .then(res => {
              axios
              .get('http://localhost:5000/api/v1/film/comment/' + this.props.match.params.src + '/' + this.props.match.params.id, { headers: { token: this.props.token }})
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
                this.setState({redirect: true})
            })
        }
    }

    render () {
        let {movie, genre, isLike, episodes, subtitle} = this.state
        var date = new Date(movie.date_uploaded_unix * 1000)
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var day = date.getDate();
        var month = months_arr[date.getMonth()];
        var year = date.getFullYear();
        const suggestion = this.state.suggestion.map((el, i) => {
            return (
                <Cover src={this.props.match.params.src} key={i} film={el} suggestion={true} magnet={el.magnet_url ? el.magnet_url : ''} torrent={el.torrent_url ? el.torrent_url : ''} />
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
                {this.handleRedirect()}
                <Header/>
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
                                {movie.title ? <h2 className="text-center">{movie.title}</h2> : null}
                                {movie.Title ? <h2 className="text-center">{movie.Title}</h2> : null}
                                <br/><br/>
                                <div className="row">
                                    <div className="col-12 text-center col-lg-6">
                                        {this.props.match.params.src === 'yts' ? movie.large_cover_image ? <img className="img-fluid film text-center" src={movie.large_cover_image} alt="" /> : <img className="img-fluid film text-center" src={require('../../img/yts.png')} alt="" /> : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Poster && movie.Poster !== 'N/A' ? <img className="img-fluid film text-center" src={movie.Poster} alt="" /> : <img className="img-fluid film text-center" src={require('../../img/eztv.png')} alt="" /> : null}
                                    </div>
                                    <div className="col mt-3 mt-lg-0">
                                        {this.props.match.params.src === 'eztv' ? movie.Plot && movie.Plot !== 'N/A' ? <p><span className="data font-weight-bold">Description:</span> {movie.Plot}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Actors && movie.Actors !== 'N/A' ? <p><span className="data font-weight-bold">{translate('actors')}:</span> {movie.Actors}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Awards && movie.Awards !== 'N/A' ? <p><span className="data font-weight-bold">{translate('awards')}:</span> {movie.Awards}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Genre && movie.Genre !== 'N/A' ? <p><span className="data font-weight-bold">Genre:</span> {movie.Genre}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Released && movie.Released !== 'N/A' ? <p><span className="data font-weight-bold">{translate('released')}:</span> {movie.Released}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Language && movie.Language !== 'N/A' ? <p><span className="data font-weight-bold">{translate('language')}:</span> {movie.Language}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Runtime && movie.Runtime !== 'N/A' ? <p><span className="data font-weight-bold">{translate('runtime')}:</span> {movie.Runtime}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Director && movie.Director !== 'N/A' ? <p><span className="data font-weight-bold">{translate('director')}:</span> {movie.Director}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.Country && movie.Country !== 'N/A' ? <p><span className="data font-weight-bold">{translate('country')}:</span> {movie.Country}</p> : null : null}
                                        {this.props.match.params.src === 'eztv' ? movie.imdbRating && movie.imdbRating !== 'N/A' ? <p><span className="data font-weight-bold">{translate('rating')}:</span> {movie.imdbRating}/10</p> : null : null}
                                        {this.props.match.params.src === 'yts' ? movie.rating ? <p><span className="data font-weight-bold">{translate('rating')}:</span> {movie.rating}/10</p> : null : null}
                                        {this.props.match.params.src === 'yts' ? day && month && year ? <p><span className="data font-weight-bold">{translate('upload')}:</span> {day + ' ' + month + ' ' + year}</p> : null : null}
                                        {this.props.match.params.src === 'yts' ? genre.length !== 0 ? <p><span className="data font-weight-bold">Genres:</span> {genre.join(', ')}</p> : null : null}
                                        {this.props.match.params.src === 'yts' ? movie.language ? <p><span className="data font-weight-bold">{translate('language')}:</span> {movie.language}</p> : null : null}
                                        {this.props.match.params.src === 'yts' ? movie.runtime ? <p><span className="data font-weight-bold">{translate('duration')}:</span> {movie.runtime} minutes</p> : null : null}
                                        {this.props.match.params.src === 'yts' ? movie.description_full ? <p><span className="data font-weight-bold">Description:</span> {movie.description_full}</p> : null : null}
                                        {this.props.match.params.src === 'yts' ? movie.description_full ?
                                        <>
                                        <p><span className="data font-weight-bold">{translate('trailer')}:</span></p>
                                        <iframe width="100%" src={`https://www.youtube.com/embed/` + movie.yt_trailer_code} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="yt" allowFullScreen></iframe>
                                        </>
                                        : null : null}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col text-center">
                                        <p><span className="data font-weight-bold float-left d-lg-none">{translate('movie')}:</span></p>
                                        <video controls width="100%" className="border" src={this.state.movieSrc}>
                                            {
                                                subtitle.map((el, i) => 
                                                    <track src={`/movies/${this.props.match.params.src}/${this.props.match.params.id}/${el}`} kind="subtitles" srcLang={el} label={el}/>
                                                )
                                            }
                                        </video>
                                        {this.state.movieSrc ? null : <button className="btn btn-danger mx-auto" onClick={this.firstView}>be the first to watch it !</button>}
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
                    { 
                        this.props.match.params.src === 'yts' ?
                        <>
                            <div className="container container-log mt-5">
                                <div className="row ml-lg-3">
                                    <div className="col login-sec">
                                        <h2 className="text-center">{translate('other-episodes')}</h2>
                                        <div className="row">
                                            <div className="col-12 mt-4">
                                                <table className="table table-hover pb-0 mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th style={{width: '33%'}} className="text-center" scope="col">#</th>
                                                            <th style={{width: '33%'}} className="text-center" scope="col">{translate('quality')}</th>
                                                            <th style={{width: '33%'}} className="text-center" scope="col">Type</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div className="col-12 episodes">
                                                <table className="table table-hover">
                                                    <tbody style={{overflow: 'scroll', height: '300px'}}>
                                                        {   
                                                            movie.torrents ?
                                                            movie.torrents.map((el, i) => (
                                                                <tr key={i} style={{cursor: 'pointer'}} onClick={() => {alert('magnet:?xt=urn:btih:' + el.hash + '&dn=' + movie.slug + '&tr=http://track.one:1234/announce&tr=udp://track.two:80')}}>
                                                                    <th style={{width: '33%'}}  className="text-center" scope="row">{i}</th>
                                                                    <td style={{width: '33%'}}  className="text-center">{el.quality}</td>
                                                                    <td style={{width: '33%'}}  className="text-center">{el.type}</td>
                                                                </tr>
                                                            )) : null
                                                        }
                                                    </tbody>
                                                </table>
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
                        </>
                        :
                            <div className="container container-log mt-5">
                                <div className="row ml-lg-3">
                                    <div className="col login-sec">
                                        <h2 className="text-center">{translate('other-episodes')}</h2>
                                        <div className="row">
                                            <div className="col-12 mt-4">
                                                <table className="table table-hover pb-0 mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th style={{width: '10%'}} className="text-center" scope="col">{translate('season')}</th>
                                                            <th style={{width: '10%'}} className="text-center" scope="col">Episode</th>
                                                            <th style={{width: '80%'}} scope="col">{translate('title')}</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div className="col-12 episodes">
                                                <table className="table table-hover">
                                                    <tbody style={{overflow: 'scroll', height: '300px'}}>
                                                        {
                                                            episodes
                                                            .sort((a, b) => a.season - b.season)
                                                            .sort((a, b) => a.episode - b.episode)
                                                            .map((el, i) => (
                                                                <tr key={i} style={{cursor: 'pointer'}} onClick={() => {alert(el.magnet_url)}}>
                                                                    <th style={{width: '10%'}} className="text-center" scope="row">{el.season}</th>
                                                                    <th style={{width: '10%'}} className="text-center" scope="row">{el.episode}</th>
                                                                    <td style={{width: '80%'}}>{el.title}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </motion.div>
            </I18nProvider>
        )
    }
}

const mapStateToProps = state => { 
    return {
        token: state.token,
        pseudo: state.pseudo,
        lang: state.lang,
        src: state.src
    }
}

export default connect(mapStateToProps, null)(Film)