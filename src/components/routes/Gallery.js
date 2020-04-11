import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import Cover from '../utils/Cover'
import '../../css/Gallery.css'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import Nav from '../utils/Nav'
import InfiniteScroll from 'react-infinite-scroll-component'
import '../../css/loader.css'
import Scroll from '../utils/Scroll'

class Gallery extends Component {

    state = {
        movies: [],
        option: '?limit=24&sort_by=year&order_by=desc&genre=all&page=1',
        title: 'Dernières Sorties',
        page: 1,
        length: 24
    }

    componentDidMount() {
        axios.get('https://yts.mx/api/v2/list_movies.json' + this.state.option, { useCredentails: true }).then(res => {
            this.setState({movies: res.data.data.movies})
        })
    }

    handleChangeGenre = () => {
        axios.get('https://yts.mx/api/v2/list_movies.json' + this.state.option, { useCredentails: true }).then(res => {
            this.setState({movies: res.data.data.movies})
        })
    }

    handleGenre = genre => {
        let newOption = this.state.option.replace(/&genre=[\w-]+/i, '&genre=' + genre.target.value)
        this.setState({page: 1, length: 24, option: newOption, title: genre.target.value === 'all' ? 'Dernières Sorties' : genre.target.value[0].toUpperCase() + genre.target.value.slice(1)}, this.handleChangeGenre)
    }

    handleConcat = () => {
        axios.get('https://yts.mx/api/v2/list_movies.json' + this.state.option, { useCredentails: true }).then(res => {
            this.setState({movies: this.state.movies.concat(res.data.data.movies)})
        }).then(() => {
            this.setState({length: this.state.length + 24})
        })
    }

    handlePage = () => {
        let newOption = this.state.option.replace(/&page=\d+/i, '&page=' + this.state.page)
        this.setState({option: newOption}, this.handleConcat)
    }

    fetchMoreData = () => {
        this.setState({page: this.state.page + 1}, this.handlePage)
    }

    render () {
        const films = this.state.movies.map((el, i) => {
            return (
                <Cover key={i} film={el} />
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
                            <Nav genre={this.handleGenre}/>
                            <div className="col-lg-9 col">
                                <div className="row">
                                    <div className="col login-sec block-shadow">
                                        <h2 className="text-center shadow-theme">{this.state.title}</h2>
                                        <div className="container-fluid">
                                            <InfiniteScroll
                                                className="overflow-hidden p-5"
                                                dataLength={this.state.length}
                                                next={this.fetchMoreData}
                                                hasMore={true}
                                                loader={<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                                            >
                                            <div className="row">
                                                { films }
                                            </div>
                                            </InfiniteScroll>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </CSSTransition>
                <Scroll />
            </Fragment>
        )
    }
}

export default Gallery