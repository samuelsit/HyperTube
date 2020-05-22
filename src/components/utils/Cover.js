import React, { Component } from 'react'
import '../../css/Cover.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Cover extends Component {

    _isMounted = false

    state = {
        poster: ''
    }

    componentDidMount() {
        this._isMounted = true
        let {film, src} = this.props
        if (src !== 'yts' && film.imdb_id !== '0') {
            axios.get('http://www.omdbapi.com/?i=tt' + film.imdb_id + '&apikey=22f35880', { useCredentails: true }).then(res => {
                if (this._isMounted) {
                    this.setState({poster: res.data.Poster})
                }
            })
        }
        else {
            if (this._isMounted) {
                this.setState({poster: film.large_screenshot})
            }
        }        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        let {film, src} = this.props
        if (src === 'yts') {
            return (
                <>
                    <div className={this.props.suggestion ? "col-3 p-1 pulse" : "col-lg-2 col-md-3 col-sm-4 col-4 p-1 pulse"}>
                        <Link to={`/film/yts/` + film.id}>
                            <img className={this.props.suggestion ? "img-fluid text-center" : "img-fluid film-gal text-center"} src={film.medium_cover_image} alt="" />
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
                        <Link to={`/film/eztv/` + film.imdb_id} style={{textDecoration: 'none'}}>
                            {film.episode !== '0' ? <div className="episode text-center px-3 py-1">Episode {film.episode}</div> : null }
                            <img className={this.props.suggestion ? "img-fluid text-center" : "img-fluid film-gal text-center"} src={this.state.poster !== "N/A" && this.state.poster !== undefined ? this.state.poster : require('../../img/eztv.png')} alt="" />
                            <h1 className="text-nowrap font-weight-bold text-danger title_film">{film.title}</h1>
                        </Link>
                    </div>
                </>
            )
        }
    }
}

export default Cover