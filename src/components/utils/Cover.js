import React, { Component } from 'react'
import '../../css/Cover.css'
import { Link } from 'react-router-dom'

class Cover extends Component {
    render () {
        const film = this.props.film
        return (
            <>
                <div className={this.props.suggestion ? "col-3 p-1 pulse" : "col-lg-2 col-md-3 col-sm-4 col-4 p-1 pulse"}>
                    <Link to={`/film/` + film.id}>
                        <img className="img-fluid film text-center" src={film.medium_cover_image} alt="" />
                        <h1 className="text-nowrap font-weight-bold text-danger title_film">{film.title}</h1>
                    </Link>
                </div>
            </>
        )
    }
}

export default Cover