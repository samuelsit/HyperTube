import React, { Component } from 'react'
import '../../css/Nav.css'

class Nav extends Component {
    render () {
            return (
                <>
                    <div className="mr-lg-4 m-0 p-0 col-lg-2 mb-5 mb-lg-0 displaySmall">
                        <div className="block-shadow text-center">
                            <select className="my-4 selectFilms shadow-theme text-center" onChange={this.props.genre}>
                                <option value='all'>All</option>
                                <option value='action'>Action</option>
                                <option value='adventure'>Adventure</option>
                                <option value='animation'>Animation</option>
                                <option value='biography'>Biography</option>
                                <option value='comedy'>Comedy</option>
                                <option value='crime'>Crime</option>
                                <option value='documentary'>Documentary</option>
                                <option value='drama'>Drama</option>
                                <option value='family'>Family</option>
                                <option value='fantasy'>Fantasy</option>
                                <option value='history'>History</option>
                                <option value='horror'>Horror</option>
                                <option value='music'>Music</option>
                                <option value='mystery'>Mystery</option>
                                <option value='romance'>Romance</option>
                                <option value='sci-fi'>Sci-Fi</option>
                                <option value='sport'>Sport</option>
                                <option value='thriller'>Thriller</option>
                                <option value='war'>War</option>
                                <option value='western'>Western</option>
                            </select>
                        </div>
                    </div>
                    <div className="mr-lg-4 col-lg-2 mb-5 mb-lg-0 displayLarge">
                        <div className="block-shadow text-center">
                            <button className="btn btn-danger mt-3" value='all' onClick={this.props.genre}>All</button><br/><hr/>
                            <button className="btn btn-danger" value='action' onClick={this.props.genre}>Action</button><br/><hr/>
                            <button className="btn btn-danger" value='adventure' onClick={this.props.genre}>Adventure</button><br/><hr/>
                            <button className="btn btn-danger" value='animation' onClick={this.props.genre}>Animation</button><br/><hr/>
                            <button className="btn btn-danger" value='biography' onClick={this.props.genre}>Biography</button><br/><hr/>
                            <button className="btn btn-danger" value='comedy' onClick={this.props.genre}>Comedy</button><br/><hr/>
                            <button className="btn btn-danger" value='crime' onClick={this.props.genre}>Crime</button><br/><hr/>
                            <button className="btn btn-danger" value='documentary' onClick={this.props.genre}>Documentary</button><br/><hr/>
                            <button className="btn btn-danger" value='drama' onClick={this.props.genre}>Drama</button><br/><hr/>
                            <button className="btn btn-danger" value='family' onClick={this.props.genre}>Family</button><br/><hr/>
                            <button className="btn btn-danger" value='fantasy' onClick={this.props.genre}>Fantasy</button><br/><hr/>
                            <button className="btn btn-danger" value='history' onClick={this.props.genre}>History</button><br/><hr/>
                            <button className="btn btn-danger" value='horror' onClick={this.props.genre}>Horror</button><br/><hr/>
                            <button className="btn btn-danger" value='music' onClick={this.props.genre}>Music</button><br/><hr/>
                            <button className="btn btn-danger" value='mystery' onClick={this.props.genre}>Mystery</button><br/><hr/>
                            <button className="btn btn-danger" value='romance' onClick={this.props.genre}>Romance</button><br/><hr/>
                            <button className="btn btn-danger" value='sci-fi' onClick={this.props.genre}>Sci-Fi</button><br/><hr/>
                            <button className="btn btn-danger" value='sport' onClick={this.props.genre}>Sport</button><br/><hr/>
                            <button className="btn btn-danger" value='thriller' onClick={this.props.genre}>Thriller</button><br/><hr/>
                            <button className="btn btn-danger" value='war' onClick={this.props.genre}>War</button><br/><hr/>
                            <button className="btn btn-danger" value='western' onClick={this.props.genre}>Western</button><br/><hr/>
                        </div>
                    </div>
                </>
            )
    }
}

export default Nav