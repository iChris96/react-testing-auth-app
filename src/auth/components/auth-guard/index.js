import React, {useState} from 'react'
import AuthContext from '../../../ultils/contexts/auth-context'

const AuthGuard = ({children, isAuth}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth)
  const [user, setUser] = useState({
    role: '',
    name: '',
  })

  const authContextValue = {
    handleSuccessAuth: ({role, name}) => {
      setUser({role, name})
      setIsAuthenticated(true)
    },
    isAuthenticated,
    user,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthGuard
