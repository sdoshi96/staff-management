import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = useSelector(state => state.auth);
    return (
        <Route {...rest} render={
            props => {
                if(auth.isAuthenticated){
                    return <Component {...props}/>
                }
                else{
                    return <Redirect to="/" />
                }
            }
        } />
    )
}


export default PrivateRoute;