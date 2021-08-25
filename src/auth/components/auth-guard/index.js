import React, {useState} from 'react'
import AuthContext from '../../../ultils/contexts/auth-context'

const AuthGuard = ({children, isAuth}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth)

  const authContextValue = {
    handleSuccessAuth: () => setIsAuthenticated(true),
    isAuthenticated,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthGuard
