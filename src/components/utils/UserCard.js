import React, { Component } from 'react'
import profilePic from '../../pictures/profile1.JPG'
import { Link } from 'react-router-dom'

class UserCard extends Component {

    state = {
        pseudo: 'samuelsit',
        age: '22'
    }
    
    render () {
        return (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                <Link to={`/profil/${this.state.pseudo}`} style={{textDecoration: 'none'}}>
                    <div className="card mb-4">
                        <div>
                            <img className="card-img-top" src={profilePic} alt="Card cap"/>
                            <div className="text-dark text-center card-header"><h5 className="card-title">{this.state.pseudo}<br/>{this.state.age} ans</h5></div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default UserCard