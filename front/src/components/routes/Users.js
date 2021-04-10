import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import UserCard from '../utils/UserCard'
import axios from 'axios'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import { pageVariant, pageTransition } from '../../css/motion'

class Users extends Component {

    state = {
        users: [],
        search: '',
        h: this.props.lang === 'fr' ? 'Rechercher un utilisateur: ' : 'Search for a user: '
    }

    _isMounted = false

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/v1/profile', { headers: { token: this.props.token }})
        .then(res => {
            this.setState({users: res.data.response.usersDoc.map((el, i) => (
                <UserCard user={el} key={i} />
            ))})
        })        
    }

    componentDidUpdate(previousProps, previousState) {
        if (this.state.search !== previousState.search && this._isMounted) {
            if (this.state.search === '') {
                this.setState({ h: this.props.lang === 'fr' ? 'Rechercher un utilisateur: ' : 'Search for a user: '})
                axios.get('http://localhost:5000/api/v1/profile', { headers: { token: this.props.token }})
                .then(res => {
                    this.setState({users: res.data.response.usersDoc.map((el, i) => (
                        <UserCard user={el} key={i} />
                    ))})
                })
            }
            else {
                this.setState({h: this.state.search})
                axios.get('http://localhost:5000/api/v1/profile', { headers: { token: this.props.token }})
                .then(res => {
                    this.setState({users: res.data.response.usersDoc.filter(this.filter).map((el, i) => (
                        <UserCard user={el} key={i} />
                    ))})
                })
            }
        }
        if (this.props.lang !== previousProps.lang && (this.state.h === 'Rechercher un utilisateur: ' || this.state.h === 'Search for a user: ')) {
            this.setState({h: this.props.lang === 'fr' ? 'Rechercher un utilisateur: ' : 'Search for a user: '})
        }
    }

    filter = el => {
        var regEx = new RegExp(this.state.h, 'i');
        return regEx.test(el.pseudo)
    }

    handleChange = e => {
        if (e.target.value === '' && this._isMounted)
            this.setState({search: e.target.value })
        else if (/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/igm.test(e.target.value) === true && this._isMounted)
            this.setState({search: e.target.value })
    }

    render () {
        return (
            <Fragment>
                <Header/>
                <motion.div 
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariant}
                transition={pageTransition}
                className="grad-block">
                    <div className="container container-log pb-lg-5">
                        <div className="row">
                            <div className="login-sec mx-auto">
                                <h2 className="text-center w-100">{this.state.h}<br/><br/><input type="text" placeholder="PSEUDO" className="form-control text-center" onChange={this.handleChange} value={this.state.search} /></h2>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.users}
                        </div>
                    </div>
                </motion.div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => { 
    return {
        token: state.token,
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(Users)