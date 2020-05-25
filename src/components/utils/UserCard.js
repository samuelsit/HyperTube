import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../css/UserCard.css'

class UserCard extends Component {
    
    render () {
        let picture = this.props.user.picture !== '' ? /^https.+/.test(this.props.user.picture) === true ? this.props.user.picture : `/pictures/${this.props.user.picture}` : require('../../img/noPicAccueil.png')
        return (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                <Link to={`/profil/${this.props.user.pseudo}`} style={{textDecoration: 'none'}}>
                    <div className="card mb-4">
                        <div>
                            <img className="card-img-top user-pic" src={picture} alt="Card cap"/>
                            <div className="text-dark text-center card-header text-nowrap" style={{textOverflow: 'ellipsis', overflow: 'hidden'}}><h5 className="card-title">{this.props.user.pseudo}</h5></div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default UserCard