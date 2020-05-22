import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import Cover from '../utils/Cover'
import '../../css/Gallery.css'
import axios from 'axios'
import Nav from '../utils/Nav'
import InfiniteScroll from 'react-infinite-scroll-component'
import '../../css/loader.css'
import Scroll from '../utils/Scroll'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import { pageVariant, pageTransition } from '../../css/motion'

class Gallery extends Component {

    _isMounted = false

    state = {
        movies: [],
        option: '?limit=24&sort_by=year&order_by=desc&genre=all&page=1&query_term=0',
        title: this.props.src.toUpperCase(),
        page: 1,
        length: 24,
        search: ''
    }

    componentDidMount() {
        this._isMounted = true
        this.props.src === 'yts' ? this.getYTS() : this.getEZTV()        
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.src !== this.props.src && this._isMounted) {
            this.setState({
                movies: [],
                option: '?limit=24&sort_by=year&order_by=desc&genre=all&page=1&query_term=0',
                page: 1,
                length: 24,
                search: ''
            }, this.props.src === 'yts' ? this.getYTS() : this.getEZTV())
        }
        if (previousProps.src !== this.props.src) {
            this.setState({title: this.props.src.toUpperCase()})
        }
    }

    getYTS = () => {
        axios.get('https://yts.mx/api/v2/list_movies.json' + this.state.option, { useCredentails: true }).then(res => {
            if (res.data.data.movies && this._isMounted) {
                this.setState({movies: res.data.data.movies})
            }
        })
    }

    getEZTV = () => {
        axios.get('https://eztv.io/api/get-torrents?limit=50&page=' + this.state.page, { useCredentails: true }).then(res => {
            if (res.data.torrents && this._isMounted) {
                this.setState({movies: res.data.torrents.filter(el => el.imdb_id !== '0')})
            }
        })
    }

    handleChangeMovie = () => {
        window.scrollTo(0, 0)
        this.props.src === 'yts' ? this.getYTS() : this.getEZTV()
    }

    handleGenre = genre => {        
        let newOption = this.state.option.replace(/&genre=[\w-]+/i, '&genre=' + genre.target.value).replace(/&query_term=.*/gi, '&query_term=0').replace(/&page=\d+/i, '&page=1')
        if (this._isMounted) {
            this.setState({page: 1, length: 24, option: newOption, title: genre.target.value[0].toUpperCase() + genre.target.value.slice(1)}, this.handleChangeMovie)
        }
    }

    handleConcat = () => {
        if (this.props.src === 'yts') {
            axios.get('https://yts.mx/api/v2/list_movies.json' + this.state.option, { useCredentails: true }).then(res => {
                if (res.data.data.movies && this._isMounted) {
                    this.setState({movies: this.state.movies.concat(res.data.data.movies)})
                }
            }).then(() => {
                if (this._isMounted) {
                    this.setState({length: this.state.length + 24})
                }
            })
        }
        else {
            axios.get('https://eztv.io/api/get-torrents?limit=50&page=' + this.state.page, { useCredentails: true }).then(res => {
                if (res.data.torrents && this._isMounted) {
                    this.setState({movies: this.state.movies.concat(res.data.torrents.filter(el => el.imdb_id !== '0'))})
                }
            }).then(() => {
                if (this._isMounted) {
                    this.setState({length: this.state.length + 24})
                }
            })
        }
    }

    handlePage = () => {
        let newOption = this.state.option.replace(/&page=\d+/i, '&page=' + this.state.page)
        if (this._isMounted) {
            this.setState({option: newOption}, this.handleConcat)
        }
    }

    fetchMoreData = () => {
        if (this._isMounted) {
            this.setState({page: this.state.page + 1}, this.handlePage)
        }
    }

    handleSearch = event => {
        let value = event.target.value === '' ? '0' : event.target.value
        let newOption = this.state.option.replace(/&query_term=.*/gi, '&query_term=' + value).replace(/&page=\d+/i, '&page=1').replace(/&genre=[\w-]+/i, '&genre=all')
        if (this._isMounted) {
            this.setState({search: event.target.value, page: 1, length: 24, option: newOption}, this.handleChangeMovie)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        const films = this.state.movies.map((el, i) => {
            return (
                <Cover key={i} film={el} src={this.props.src} />
            )
        })
        return (
            <Fragment>
                <Header selectVal={this.handleSearch}/>
                <motion.div 
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariant}
                transition={pageTransition}
                className="grad-block-gal">
                    <div className={this.props.src === 'yts' ? "container-fluid" : "container"}>
                        <div className="row">
                            { this.props.src === 'yts' ? <Nav genre={this.handleGenre}/> : null }
                            { this.props.src === 'yts' ? <div className="mr-lg-4 col-lg-2 mb-5 mb-lg-0 d-none d-lg-block" style={{zIndex: '-10'}}></div> : null }
                            <div className={this.props.src === 'yts' ? "col-lg-9 col" : "col"}>
                                <div className="row">
                                    <div className="col login-sec block-shadow">
                                        <h2 className="text-center shadow-theme">{this.state.search ? this.state.search : this.state.title}</h2>
                                        <div className="container-fluid">
                                            <InfiniteScroll
                                                className="overflow-hidden p-lg-5 p-sm-0"
                                                dataLength={this.state.length}
                                                next={this.fetchMoreData}
                                                hasMore={true}
                                                loader={<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                                            >
                                            <div className="row ml-1">
                                                { films }
                                            </div>
                                            </InfiniteScroll>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <Scroll />
            </Fragment>
        )
    }
}

const mapStateToProps = state => { 
    return {
        lang: state.lang,
        src: state.src
    }
}

export default connect(mapStateToProps, null)(Gallery)