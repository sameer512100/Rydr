import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtect = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  return <>{children}</>
}

export default UserProtect