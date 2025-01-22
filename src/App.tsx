import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, } from 'react-router-dom';
import AppRouter from './App-Router';
import { AuthProvider } from 'react-auth-kit'



function App() {
    return (




        <AuthProvider 
            authType="localstorage"
            authName="_auth_t"
            //authTimeStorageName="_auth_time"
            //stateStorageName="_auth_state"
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}>

            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>


        </AuthProvider>



    );
}

export default App;
