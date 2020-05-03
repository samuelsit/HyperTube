import React, { Component, Fragment } from 'react'
import Header from '../utils/Header'
import UserCard from '../utils/UserCard'
import { CSSTransition } from 'react-transition-group'

class Users extends Component {

    state = {
        users: [],
        search: '',
        h: 'Rechercher un utilisateur: '
    }

    _isMounted = false

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
        // axios
        // .get('http://localhost:5000/api')
        // .then(res => {
        //     if (res.data) {
        //         this.setState({users: res.data})
        //     }
        // })
    }

    componentDidUpdate(previousProps, previousState) {
        if (this.state.search !== previousState.search && this._isMounted) {
            if (this.state.search === '') {
                this.setState({ h: 'Rechercher un utilisateur: '})
                // axios
                // .get('http://localhost:5000/api')
                // .then(res => {
                //     if (res.data) {
                //         this.setState({users: res.data})
                //     }
                // })
            }
            else {
                this.setState({h: this.state.search})
                // axios
                // .post('http://localhost:5000/api', {
                //     search: this.state.search
                // })
                // .then(res => {
                //     if (res.data) {
                //         this.setState({users: res.data})
                //     }
                // })
            }
        }
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
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={600}
                    classNames="fade"
                >
                <div className="grad-block">
                    <div className="container container-log pb-lg-5">
                        <div className="row">
                            <div className="login-sec mx-auto">
                                <h2 className="text-center w-100">{this.state.h}<br/><br/><input type="text" placeholder="PSEUDO" className="form-control text-center" onChange={this.handleChange} value={this.state.search} /></h2>
                            </div>
                        </div>
                        <div className="row">
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                            <UserCard users={this.state.users}/>
                        </div>
                    </div>
                </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

export default Users