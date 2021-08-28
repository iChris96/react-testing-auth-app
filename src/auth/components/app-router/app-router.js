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
import EmployeePage from '../employees-page/employeees-page'

const PrivateRoute = ({children, path}) => {
  const {isAuthenticated} = useContext(AuthContext)
  // console.log('trying to go: ', path)
  // console.log('have auth: ', isAuthenticated)

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
