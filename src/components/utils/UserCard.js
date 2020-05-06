import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserCard extends Component {
    
    render () {
        let picture = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(this.props.user.picture) === true ? this.props.user.picture : require(`../../img/${this.props.user.picture}`)
        return (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                <Link to={`/profil/${this.props.user.pseudo}`} style={{textDecoration: 'none'}}>
                    <div className="card mb-4">
                        <div>
                            <img className="card-img-top" src={picture} alt="Card cap"/>
                            <div className="text-dark text-center card-header text-nowrap" style={{textOverflow: 'ellipsis', overflow: 'hidden'}}><h5 className="card-title">{this.props.user.pseudo}</h5></div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default UserCard