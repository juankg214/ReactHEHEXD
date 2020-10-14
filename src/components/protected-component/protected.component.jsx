import React from "react";
import {Route, Redirect} from "react-router-dom";


export const ProtectedRoute = ({
                                   component: Component, typeRole, handleLoggedIn,
                                   ...rest
                               }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem("token")) {
                    if(localStorage.getItem("role") === typeRole){
                        return <Component role={typeRole} handleLoggedIn={handleLoggedIn} {...props} />;
                    } else {
                        return "NOT AUTHORIZED"
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};