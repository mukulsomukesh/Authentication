import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';



export default function PrivateRoute({ children }) {

    const isLoginSuccess = useSelector((state) => state.AuthReducer.isLoginSuccess);

    // if user not login
    if (!isLoginSuccess) {
        return <Navigate to="/signup"> </Navigate>
    }
    else {
        return children;
    }
}
