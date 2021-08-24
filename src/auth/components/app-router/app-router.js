import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import LoginPage from '../login-page/login-page'

const AdminPage = () => <h1>Admin Page</h1>
const EmployeePage = () => <h1>Employee Page</h1>

const isAuth = false

const PrivateRoute = ({children, path}) => (
  <Route path={path}>{isAuth ? {children} : <Redirect to="/" />}</Route>
)

export const AppRouter = () => (
  <Router>
    <div>
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
    </div>
  </Router>
)

export default AppRouter
