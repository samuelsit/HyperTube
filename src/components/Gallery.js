import React, { Component, Fragment } from 'react'
import Header from './Header'
import Film from './Film'
import '../css/Gallery.css'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import RightNav from './RightNav'

class Gallery extends Component {

    state = {
        movies: []
    }

    componentDidMount() {
        axios.get('https://yts.mx/api/v2/list_movies.json').then(res => {
            this.setState({movies: res.data.data.movies})
        })
    }

    render () {
        const films = this.state.movies.map((el, i) => {
            return (
                <>
                    <Film key={i} img={el.large_cover_image} />
                </>
            )
        })

        return (
            <Fragment>
                <Header/>
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={600}
                    classNames="fade"
                >
                <div className="grad-block">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col login-sec block-shadow">
                                        <h2 className="text-center">Dernières Sortie</h2>
                                        <div className="container-fluid">
                                            <div className="row">
                                                {films}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="row">
                                    <div className="col login-sec block-shadow">
                                        <h2 className="text-center">TOP 10</h2>
                                    </div>
                                </div>
                            </div>
                            <RightNav/>
                        </div>
                    </div>
                </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

export default Gallery