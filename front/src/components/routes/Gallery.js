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
        option: '?limit=50&sort_by=year&order_by=desc&genre=all&page=1&query_term=0',
        title: this.props.src.toUpperCase(),
        page: 1,
        length: 24,
        search: '',
        searchEZ: false
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
                this.setState({ movies: this.removeBadSeeds(res.data.data.movies, 'yts') })
            }
        })
    }

    getEZTV = () => {
        axios.get('https://eztv.re/api/get-torrents?limit=100&page=' + this.state.page, { useCredentails: true }).then(res => {
            if (res.data.torrents && this._isMounted) {
                let goodSeeds = this.removeBadSeeds(this.removeDoublons(res.data.torrents.filter(el => el.imdb_id !== '0'), 'imdb_id'), 'eztv')
                this.setState({movies: goodSeeds})
            }
        })
    }

    removeDoublons = (originalArray, prop) => {
        var newArray = [];
        var lookupObject = {};
   
        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }
   
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    removeBadSeeds = (movies, src) => {
      let goodSeeds = [];
      if (src === 'yts') {
        movies.map(movie => {
          if (movie.torrents[0].seeds > 100) {
            goodSeeds.push(movie);
          }
          return movie
        })
      } else if (src === 'eztv') {
        movies.map(movie => {
          if (movie.seeds > 30) {
            goodSeeds.push(movie);
          }
          return movie
        })
      }
      
      return goodSeeds;
    }

    handleChangeMovie = () => {
        window.scrollTo(0, 0)
        this.props.src === 'yts' ? this.getYTS() : this.getEZTV()
    }

    handleGenre = genre => {
        this.setState({searchEZ: false})
        document.getElementsByClassName('btn-secondary sam')[0].classList.add('btn-danger')
        document.getElementsByClassName('btn-secondary sam')[0].classList.remove('btn-secondary')
        document.getElementsByClassName('sam')[0].classList.remove('sam')
        genre.target.classList.remove('btn-danger')
        genre.target.classList.add('btn-secondary')
        genre.target.classList.add('sam')
        let newOption = this.state.option.replace(/&genre=[\w-]+/i, '&genre=' + genre.target.value).replace(/&query_term=.*/gi, '&query_term=0').replace(/&page=\d+/i, '&page=1')
        if (this._isMounted) {
            this.setState({page: 1, length: 24, option: newOption}, this.handleChangeMovie)
        }
    }

    handleConcat = () => {
        if (this.props.src === 'yts') {
            axios.get('https://yts.mx/api/v2/list_movies.json' + this.state.option, { useCredentails: true }).then(res => {
                if (res.data.data.movies && this._isMounted) {
                    let goodSeeds = this.removeBadSeeds(res.data.data.movies, 'yts')
                    this.setState({movies: this.state.movies.concat(goodSeeds)})
                }
            }).then(() => {
                if (this._isMounted) {
                    this.setState({length: this.state.length + 24})
                }
            })
        }
        else if (!this.state.searchEZ) {
            axios.get('https://eztv.re/api/get-torrents?limit=100&page=' + this.state.page, { useCredentails: true }).then(res => {
                if (res.data.torrents && this._isMounted) {
                    let goodSeeds = this.removeBadSeeds(this.removeDoublons(res.data.torrents.filter(el => el.imdb_id !== '0'), 'imdb_id'), 'eztv')
                    this.setState({movies: this.state.movies.concat(goodSeeds)})
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
        if (this.props.src === 'yts') {
            let newOption = this.state.option.replace(/&query_term=.*/gi, '&query_term=' + value).replace(/&page=\d+/i, '&page=1').replace(/&genre=[\w-]+/i, '&genre=all')
            if (this._isMounted) {
                this.setState({searchEZ: true, search: event.target.value, page: 1, length: 24, option: newOption}, this.handleChangeMovie)
            }
        }
        else {
            if (this._isMounted) {
                if (value !== '0') {
                    axios.get('http://www.omdbapi.com/?s=' + value + '&type=series&apikey=' + process.env.REACT_APP_KEY_OMDB, { useCredentails: true }).then(res => {
                        this.setState({searchEZ: true, movies:res.data.Search})
                    })
                }
                else {
                    this.setState({searchEZ: false})
                    this.getEZTV()
                }
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        const films = this.state.movies ? this.state.movies.map((el, i) => {
            return (
                <Cover key={i} film={el} src={this.props.src} searchEZ={this.state.searchEZ}/>
            )
        }) : null
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
                    <div className="container-fluid">
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
                                                hasMore={!this.state.searchEZ}
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