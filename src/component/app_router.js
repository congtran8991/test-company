import React, { Component, useContext, useState } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Offline, Online, Detector } from "react-detect-offline";
import { routes } from './routes';
import Header from './header'
import { notification } from "antd"
import ThemeContextProvider from '../contexts/userContext';
import Loading from '../component/loading'
import LoadingOverlay from 'react-loading-overlay'
import { LoadingContext } from '../contexts/userContext'
function AppRouter() {
    const { isLoading, setIsLoading } = useContext(LoadingContext)
    const [checkNetwork, setCheckNetwork] = useState(1)
    const showContentMenus = () => {
        let result = routes.map((router, index) => {
            return (
                <Route
                    key={index}
                    exact={router?.exact}
                    path={router?.path}>
                    {router?.main}
                </Route>
            )
        })
        return <Switch>{result}</Switch>;
    }
    const notti = (type) => {
        return (
            notification[type]({
                message: 'Mất kết nối wifi',
                duration: '20'
            })
        )
    }
    return (
        <BrowserRouter>
            <Detector
                render={({ online }) => (
                    <div className={online ? "" : "warning"}>
                        {online ? <LoadingOverlay active={isLoading}
                            text='Loading your content...'
                            spinner>
                            <Switch>{showContentMenus()}</Switch>
                        </LoadingOverlay> : <LoadingOverlay active={1}
                            text='Không kết nối internet'
                            spinner>
                            <Switch>{showContentMenus()}</Switch>
                        </LoadingOverlay>}
                    </div>
                )}
            />

        </BrowserRouter>
    );
}

export default AppRouter;
