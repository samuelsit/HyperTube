import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import '../../css/Profile.css'
import profilePic from '../../img/noPic.png'
import { CSSTransition } from 'react-transition-group'
import Carousel from '../utils/Carousel'
import axios from 'axios'
import { connect } from 'react-redux'

class Profile extends Component {

    _isMounted = false

    state = {
        watched_movies: [],
        liked_movies: []
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('https://yts.mx/api/v2/list_movies.json?limit=24&sort_by=year&order_by=desc&genre=all&page=1&query_term=0', { useCredentails: true })
        .then(res => {
            if (this._isMounted) {
                this.setState({watched_movies: res.data.data.movies})
            }
        })
        axios.get('https://yts.mx/api/v2/list_movies.json?limit=24&sort_by=year&order_by=desc&genre=all&page=1&query_term=0', { useCredentails: true })
        .then(res => {
            if (this._isMounted) {
                this.setState({liked_movies: res.data.data.movies})
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                            <div className="image text-center">
                                <img className="" width="200" alt="Profile" src={profilePic}/>
                            </div>
                        </div>
                        <div className="row page">
                            <div className="login-sec mx-auto">
                                <h2 className="text-center">{this.props.pseudo}</h2>
                            </div>
                        </div>
                        <div className="card p-3 row m-lg-1 mt-lg-5 mt-5">
                            <h4 className="font-weight-bold"><i className="far fa-clock h2" style={{color: '#DD3444'}}></i> Récemment vus</h4>
                            <Carousel movies={this.state.watched_movies} />
                        </div>
                        <div className="card p-3 row m-lg-1">
                            <h4 className="font-weight-bold"><i className="far fa-heart h2" style={{color: '#DD3444'}}></i> Récemment aimés</h4>
                            <Carousel movies={this.state.liked_movies} />
                        </div>
                    </div>
                </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

const mapStateToProps = state => { 
    return {
        pseudo: state.pseudo
    }
}

export default connect(mapStateToProps, null)(Profile)