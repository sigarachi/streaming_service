import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import {RegisterPage} from "./pages/RegisterPage";

export const useRoutes = () => {
    return(
        <Switch>
            <Route path="/auth" >
                <AuthPage />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Redirect to="/auth" />
        </Switch>
    )
}
