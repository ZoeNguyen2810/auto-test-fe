import React, { useEffect } from 'react'
import { AuthWrapperProps } from './Type/Auth'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from './Context'
import { useState } from 'react'
import LogIn from './Component/Auth/Login/login'

export const AuthWrapper : React.FC<AuthWrapperProps> = ({ children}) => {

  const { isLogged } = useGlobalContext()
  const navigate = useNavigate()
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {

    if (!!isLogged) {
        setAuthenticated(true)
    } else {
        navigate('/login')
    }
}, [navigate])
  return (
    isAuthenticated ? <>{children}</> : <LogIn/>
  )
}
