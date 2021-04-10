import React, { Component } from 'react'
import '../../css/Cover.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Cover extends Component {

    _isMounted = false

    state = {
        poster: '',
        title: '',
        rating: '',
        year: '',
        id: 0
    }

    componentDidMount() {
        this._isMounted = true
        let {film, src, searchEZ} = this.props
        if (searchEZ) {
            this.setState({poster: film.Poster, title: film.Title, rating: film.imdbRating, year: film.Year, id: film.imdbID === undefined ? '' : film.imdbID.replace(/([^0-9]?)/g, '')})
        }
        else {
            if (src !== 'yts' && film.imdb_id !== '0') {
                let url = searchEZ ? 'http://www.omdbapi.com/?i=' + film.imdb_id + '&apikey=' + process.env.REACT_APP_KEY_OMDB : 'http://www.omdbapi.com/?i=tt' + film.imdb_id + '&apikey=' + process.env.REACT_APP_KEY_OMDB
                axios.get(url, { useCredentails: true }).then(res => {
                    if (this._isMounted) {
                        this.setState({poster: res.data.Poster, title: res.data.Title, rating: res.data.imdbRating, year: res.data.Year})
                    }
                })
            }
            else {
                if (this._isMounted) {
                    this.setState({poster: film.large_screenshot})
                }
            }
        }
                
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        let {film, src, searchEZ} = this.props
        if (src === 'yts') {
            return (
                <>
                    <div className={this.props.suggestion ? "col-3 p-1 pulse" : "col-lg-2 col-md-3 col-sm-4 col-4 p-1 pulse"}>
                        <Link to={"/film/yts/" + film.id + '/0'}>
                            <div className="episode text-center px-3 py-1">{film.year} &bull; {film.rating}/10</div>
                            <img className={this.props.suggestion ? "w-96 text-center" : "img-fluid film-gal text-center border"} src={film.medium_cover_image} alt="" />
                            <h1 className="text-nowrap font-weight-bold text-danger title_film">{film.title}</h1>
                        </Link>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className={this.props.suggestion ? "col-3 p-1 pulse" : "col-lg-2 col-md-3 col-sm-4 col-4 p-1 pulse"}>
                        <Link to={searchEZ ? `/film/eztv/` + this.state.id : `/film/eztv/` + film.imdb_id + '/0'} style={{textDecoration: 'none'}}>
                            {this.state.rating !== 'N/A' && this.state.year !== undefined ? <div className="episode text-center px-3 py-1">{this.state.year.substr(0,4)} &bull; {this.state.rating}/10</div> : null}
                            <img className="img-fluid film-gal text-center border" src={this.state.poster !== "N/A" && this.state.poster !== undefined ? this.state.poster : require('../../img/eztv.png')} alt="" />
                            <div className="text-nowrap font-weight-bold text-danger title_film">{this.state.title !== '' ? this.state.title : film.title}</div>
                        </Link>
                    </div>
                </>
            )
        }
    }
}

export default Cover