import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PublicRoute = ({component: Component, isAuth, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            !isAuth ?
                <Component {...props} />
            : <Redirect to="/galerie" />
        )} />
    );
};

const mapStateToProps = state => { 
    return {
        isAuth: state.isAuth
    }
}

export default connect(mapStateToProps, null)(PublicRoute)