import React, { useContext } from 'react'

import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login'
import Menubar from './components/Menubar/Menubar'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import { AppContext } from './context/AppContext'
import NotFound from './pages/NotFound/NotFound'


const App = () => {

  const location = useLocation();

  const {auth} = useContext(AppContext);

  const LoginRoute = ({element})=>{
    if(auth.token){
      return <Navigate to="/dashboard" replace></Navigate>
    }
    return element;
  }

  const ProtectedRoute = ({element,allowedRoles})=>{
    if(!auth.token){
      return <Navigate to="/login" replace></Navigate>
    }
    if(allowedRoles && !allowedRoles.includes(auth.role)){
      return <Navigate to="/dashboard" replace></Navigate>
    }
    return element;
  }

  return (
    <div>
      {location.pathname!=="/login" && <Menubar/>}
      <Toaster/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/explore' element={<Explore/>}></Route>
  
        {/* admin only */}
        <Route path='/category' element={<ProtectedRoute element={<ManageCategory/>} allowedRoles={["ROLE_ADMIN"]}></ProtectedRoute>}></Route>
        <Route path='/users' element={<ProtectedRoute element={<ManageUsers/>} allowedRoles={["ROLE_ADMIN"]}></ProtectedRoute>}></Route>
        <Route path='/items' element={<ProtectedRoute element={<ManageItems/>} allowedRoles={["ROLE_ADMIN"]}></ProtectedRoute>}></Route>
        
        <Route path='/login' element={<LoginRoute element={<Login/>}></LoginRoute>}></Route>
        <Route path='/orders' element={<OrderHistory/>}></Route>
        <Route path='/' element={<Dashboard/>}></Route>

        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  )
}

export default App