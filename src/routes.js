import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AddAccount from "./Components/AddAccount";
import AccessRoute from "./AccessRoute";

const routes = [
    {
        path: "/",
        component: <Home />,
        protectedRoute: false,
        renderWithoutLogin: true,
    },
    {
        path: "/dashboard",
        component: <Dashboard />,
        protectedRoute: true,
        renderWithoutLogin: false,
    }
]

const Routes = () => {
    return (
        <Switch>
            {routes.map(({path,component,protectedRoute,renderWithoutLogin}) => 
            protectedRoute? (
                <AccessRoute >
                    {component}
                </AccessRoute>
            ) : 
            (<Route exact key={path} path={path} >
                {component}
            </Route>))
            }
        </Switch>
    )

}

export default Routes;