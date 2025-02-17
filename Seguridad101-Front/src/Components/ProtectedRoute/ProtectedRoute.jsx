import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext()

  return (
    isAuthenticated
    ?
    <Outlet />
    :
    <Navigate to="/" />
  )
}

export default ProtectedRoute