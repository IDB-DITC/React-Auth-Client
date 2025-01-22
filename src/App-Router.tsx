import { Box } from "@mui/material";
import { Link, Switch, Route } from "react-router-dom";

import { PrivateRoute } from 'react-auth-kit'

import ProductCreate from "./components/product-create";
import ProductEdit from "./components/product-edit";
import ProductIndex from "./components/product-index";
import RegisterComponent from "./components/auth/register";
import LoginComponent from "./components/auth/login";
import { useAuthUser, useSignOut } from 'react-auth-kit'

import "./app-router.css";
import AppHeader from "./App-Header";



export default function AppRouter() {


    return (
        <>
            <AppHeader />

            <Switch>

                <Route exact path="/">
                    <ProductIndex />
                </Route>
                <PrivateRoute path="/create" loginPath={'/login'}>
                    <ProductCreate />
                </PrivateRoute>

                {/*<Route path="/edit/:id">*/}
                {/*    <ProductEdit />*/}
                {/*</Route>*/}

                <PrivateRoute path={'/edit/:id'} component={ProductEdit} loginPath={'/login'} exact />



                <Route path="/register">
                    <RegisterComponent />
                </Route>
                <Route path="/login">
                    <LoginComponent />
                </Route>


            </Switch>
        </>
    )


}