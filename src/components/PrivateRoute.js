import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isAuth] = useState(useSelector(state => state.isAuth))

    return (
        <Route {...rest} render={props => (
            isAuth ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute