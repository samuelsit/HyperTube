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

    componentDidMount() {
        //default req all users to state
    }

    componentDidUpdate(previousProps, previousState) {
        if (this.state.search !== previousState.search) {
            if (this.state.search === '') {
                this.setState({ h: 'Rechercher un utilisateur: '})
                console.log('req users with search: default');
            }
            else {
                this.setState({h: this.state.search})
                console.log('req users with search: ' + this.state.search);
            }
        }
    }

    handleChange = e => {
        this.setState({search: e.target.value})
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
                            <div className="login-sec mx-auto w-75">
                                <h2 className="text-center">{this.state.h}<br/><br/><input type="text" placeholder="PSEUDO" className="form-control text-center" onChange={this.handleChange} value={this.state.search} /></h2>
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