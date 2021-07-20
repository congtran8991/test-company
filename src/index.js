import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Router from './component/app_router';
import ThemeContextProvider from './contexts/userContext';
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <UserProvider > */}
    <ThemeContextProvider>
    <Router />
    </ThemeContextProvider>
    {/* </UserProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
