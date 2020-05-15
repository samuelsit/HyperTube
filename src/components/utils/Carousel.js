import React, { Component, Fragment } from 'react'
import '../../css/Carousel.css'
import { Link } from 'react-router-dom'

class Carousel extends Component {

    constructor(props) {
        super(props)
        this.Ref = React.createRef()
    }

    handleClickRight = () => {
        let i = 0
        let interval = setInterval(() => {
            this.Ref.current.scrollLeft += 5
            i += 5
            if (i >= 230)
            clearInterval(interval)
        }, 5)
    }

    handleClickLeft = () => {
        let i = 0
        let interval = setInterval(() => {
            this.Ref.current.scrollLeft -= 5
            i += 5
            if (i >= 230)
            clearInterval(interval)
        }, 5)
    }

    render () {   
        let {movies} = this.props
        const films = movies.map((el, i) => {            
            return (
                <div className="tile" key={i}>
                    <div className="tile-media">
                        <Link to={`/film/${el.id}`}><img src={el.medium_cover_image} className="img-carou" alt="background"/></Link>
                    </div>
                </div>
            )
        })
                
        return (
            <Fragment>
                <div ref={this.Ref} className="ml-0 row row-car">
                    <div className="row-inner">
                        {films}
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <button onClick={this.handleClickLeft} className="btn btn-danger btn-sm" style={{float: 'left'}}><i className="fas fa-chevron-left"></i></button>
                    <button onClick={this.handleClickRight} className="btn btn-danger btn-sm" style={{float: 'right'}}><i className="fas fa-chevron-right"></i></button>
                </div>
            </Fragment>
        )
    }
}

export default Carousel