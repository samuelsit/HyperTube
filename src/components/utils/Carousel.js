import React, { Component, Fragment } from 'react'
import '../../css/Carousel.css'
import { Link } from 'react-router-dom'

class Carousel extends Component {
    render () {
        const films = this.props.movies.map((el, i) => {
            return (
                <Fragment key={i}>
                    <div className="tile">
                        <div className="tile-media">
                            <Link to={`/film/${el.id}`}><img src={el.medium_cover_image} className="img-carou" alt="background"/></Link>
                        </div>
                    </div>
                </Fragment>
            )
        })
        return (
            <Fragment>
                <div className="ml-0 row row-car">
                    <div className="row-inner">
                        {films}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Carousel