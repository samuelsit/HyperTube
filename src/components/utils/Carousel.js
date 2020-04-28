import React, { Component, Fragment } from 'react'
import '../../css/Carousel.css'

class Carousel extends Component {
    render () {
        const films = this.props.movies.map((el, i) => {
            return (
                <Fragment key={i}>
                    <div className="tile">
                        <div className="tile-media">
                            <img src={el.medium_cover_image} className="img-carou" alt="background"/>
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