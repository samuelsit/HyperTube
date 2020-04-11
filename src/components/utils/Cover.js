import React, { Component } from 'react'
import '../../css/Cover.css'
import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'

class Cover extends Component {
    render () {
        const film = this.props.film
        return (
            <>
            <CSSTransition
                in={true}
                appear={true}
                timeout={600}
                classNames="fade"
            >
                <div className={this.props.suggestion ? "col-3 p-1 pulse" : "col-lg-2 col-md-3 col-sm-4 col-4 p-1 pulse"}>
                    <Link to={`/film/` + film.id}>
                        <img className="img-fluid film text-center" src={film.medium_cover_image} alt="" />
                        <p className="text-nowrap font-weight-bold text-secondary title_film">{film.title.length > 12 ? film.title.substr(0, 11) + '...' : film.title}</p>
                    </Link>
                </div>
            </CSSTransition>
            </>
        )
    }
}

export default Cover