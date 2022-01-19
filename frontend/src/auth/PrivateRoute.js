import React from 'react'
import {isAuthenticated} from '../Helpers/isAuthenticated'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={ props=>
                isAuthenticated()? (<Component {...props}/>) : <Redirect  to={{pathname:"/signin"}}/>
            }
        />
            
    )
}

export default PrivateRoute
