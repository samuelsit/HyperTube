import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import '../../css/Profile.css'
import profilePic from '../../pictures/profile1.JPG'
import Cover from '../../pictures/cover1.JPG'
import { CSSTransition } from 'react-transition-group'
import Carousel from '../utils/Carousel'
import axios from 'axios'

class Profile extends Component {

    state = {
        movies: []
    }

    componentDidMount() {
        axios.get('https://yts.mx/api/v2/list_movies.json?limit=24&sort_by=year&order_by=desc&genre=all&page=1&query_term=0', { useCredentails: true }).then(res => {
            this.setState({movies: res.data.data.movies})
        })
    }

    render () {
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
                    <div className="container container-log pb-lg-5">
                        <div className="row row-header">
                            <img className="cover img-fluid" alt="Cover" src={Cover} />
                            <div className="image text-center">
                                <img className="" width="200" alt="Profile" src={profilePic}/>
                            </div>
                        </div>
                        <div className="row page">
                            <div className="login-sec mx-auto">
                                <h2 className="">user</h2>
                            </div>
                        </div>
                        <div className="card p-3 row m-lg-1 mt-lg-5 mt-5">
                            <h4 className="font-weight-bold">Films récemment vus <i className="far fa-clock" style={{color: '#DD3444'}}></i></h4>
                            <Carousel movies={this.state.movies} />
                        </div>
                        <div className="card p-3 row m-lg-1">
                            <h4 className="font-weight-bold">Films aimés <i className="far fa-heart" style={{color: '#DD3444'}}></i></h4>
                            <Carousel movies={this.state.movies} />
                        </div>
                    </div>
                </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

export default Profile