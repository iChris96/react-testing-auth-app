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

const PrivateRoute = ({children, path, isAuth}) => (
  <Route path={path}>{isAuth ? children : <Redirect to="/" />}</Route>
)

export const AppRouter = ({isAuth}) => (
  <Router>
    <div>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin" isAuth={isAuth}>
          <AdminPage />
        </PrivateRoute>

        <PrivateRoute path="/employee" isAuth={isAuth}>
          <EmployeePage />
        </PrivateRoute>
      </Switch>
    </div>
  </Router>
)

export default AppRouter
