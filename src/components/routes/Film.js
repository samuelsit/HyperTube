import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import axios from 'axios'
import '../../css/Film.css'
import Cover from '../utils/Cover'

class Film extends Component {
    state = {
        movie: [],
        genre: [],
        suggestion: []
    }

    componentDidMount() {
        axios.get('https://yts.mx/api/v2/movie_details.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
            this.setState({movie: res.data.data.movie, genre: res.data.data.movie.genres})
        })
        axios.get('https://yts.mx/api/v2/movie_suggestions.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
            this.setState({suggestion: res.data.data.movies})
        })
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps !== this.props) {
            axios.get('https://yts.mx/api/v2/movie_details.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
                this.setState({movie: res.data.data.movie, genre: res.data.data.movie.genres})
            })
            axios.get('https://yts.mx/api/v2/movie_suggestions.json?movie_id=' + this.props.match.params.id, { useCredentails: true }).then(res => {
                this.setState({suggestion: res.data.data.movies})
            })
        }
    }

    render () {
        let movie = this.state.movie
        let genre = this.state.genre
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
        return (
            <Fragment>
                <Header/>
                <div className="grad-block">
                    <div className="container container-log">
                        <div className="row">
                            <div className="col login-sec">
                                <h2 className="text-center">{movie.title}</h2>
                                <div className="row">
                                    <div className="col-12 text-center col-lg-6">
                                        <img className="img-fluid film text-center" src={movie.large_cover_image} alt="" />
                                    </div>
                                    <div className="col mt-3 mt-lg-0">
                                        <p><span className="data font-weight-bold">Évaluation:</span> {movie.rating}/10</p>
                                        <p><span className="data font-weight-bold">Upload:</span> {day + ' ' + month + ' ' + year}</p>
                                        <p><span className="data font-weight-bold">Genres:</span> {genre.join(', ')}</p>
                                        <p><span className="data font-weight-bold">Langue:</span> {movie.language}</p>
                                        <p><span className="data font-weight-bold">Durée:</span> {movie.runtime} minutes</p>
                                        <p><span className="data font-weight-bold">Description:</span> {movie.description_full}</p>
                                        <p><span className="data font-weight-bold">Trailer:</span></p>
                                        <iframe width="100%" src={`https://www.youtube.com/embed/` + movie.yt_trailer_code} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="yt" allowFullScreen></iframe>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col text-center">
                                        <p><span className="data font-weight-bold float-left d-lg-none">Film:</span></p>
                                        <video controls width="100%" className="border"></video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container container-log mt-5">
                        <div className="row ml-lg-3">
                            <div className="col login-sec">
                                <h2 className="text-center">Vous aimerez aussi</h2>
                                <div className="row">
                                    {suggestion}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Film