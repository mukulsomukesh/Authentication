import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import NotFound from './NotFound'
import PrivateRoute from '../Components/PrivateRoute'

export default function AllRoutes() {
  return (
<Routes>
<Route path="/" element={ <PrivateRoute> <Home /> </PrivateRoute> } />
<Route path="/signup" element={ <Signup /> } />
<Route path="/login" element={ <Login /> } />
<Route path="*" element={ <NotFound /> } />
</Routes>
  )
}
