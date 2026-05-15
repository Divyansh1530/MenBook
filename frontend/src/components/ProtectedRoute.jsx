import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({
  children,
  user,
  allowedRole
}) {

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute