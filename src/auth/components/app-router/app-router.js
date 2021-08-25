import React, {useContext} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import LoginPage from '../login-page/login-page'
import AuthContext from '../../../ultils/contexts/auth-context'
import AdminPage from '../admin-page/admin-page'

const EmployeePage = () => <h1>Employee Page</h1>

const PrivateRoute = ({children, path}) => {
  const {isAuthenticated} = useContext(AuthContext)
  return (
    <Route path={path}>
      {isAuthenticated ? children : <Redirect to="/" />}
    </Route>
  )
}

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>

      <PrivateRoute path="/admin">
        <AdminPage />
      </PrivateRoute>

      <PrivateRoute path="/employee">
        <EmployeePage />
      </PrivateRoute>
    </Switch>
  </Router>
)

export default AppRouter
