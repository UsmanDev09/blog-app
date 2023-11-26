import React from 'react';
import { Navigate } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

function Protected({ Component } : { Component: React.ComponentType<unknown> }) {
    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn && (Component === Login || Component === Register)) {
        return <Navigate to='/' />;
    }
    if (!isLoggedIn && Component !== Login) {
        return <Navigate to='/login' />;
    }
    return <Component />;
}

export default Protected;